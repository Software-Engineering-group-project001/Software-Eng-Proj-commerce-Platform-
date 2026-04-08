const pool = require('../config/db');

// Create the products table if it doesn't exist
const createProductTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) NOT NULL,
      image_url TEXT,
      category VARCHAR(100),
      stock_quantity INTEGER DEFAULT 0,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;
  await pool.query(query);
};

// Get all active products
const getAllProducts = async () => {
  const result = await pool.query(
    'SELECT * FROM products WHERE is_active = true ORDER BY created_at DESC'
  );
  return result.rows;
};

// Get a single product by ID
const getProductById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM products WHERE id = $1', [id]
  );
  return result.rows[0];
};

// Create a new product
const createProduct = async ({ name, description, price, image_url, category, stock_quantity }) => {
  const result = await pool.query(
    `INSERT INTO products (name, description, price, image_url, category, stock_quantity)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [name, description, price, image_url, category, stock_quantity]
  );
  return result.rows[0];
};

// Update a product
const updateProduct = async (id, { name, description, price, image_url, category, stock_quantity }) => {
  const result = await pool.query(
    `UPDATE products SET name=$1, description=$2, price=$3, image_url=$4,
     category=$5, stock_quantity=$6 WHERE id=$7 RETURNING *`,
    [name, description, price, image_url, category, stock_quantity, id]
  );
  return result.rows[0];
};

// Soft delete — marks product as inactive instead of deleting it
const deleteProduct = async (id) => {
  const result = await pool.query(
    'UPDATE products SET is_active = false WHERE id = $1 RETURNING *', [id]
  );
  return result.rows[0];
};

module.exports = {
  createProductTable,
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};