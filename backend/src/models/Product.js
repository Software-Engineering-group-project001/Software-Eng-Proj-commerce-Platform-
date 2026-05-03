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

// Get a single active product by ID (inactive/deleted products are excluded)
const getProductById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM products WHERE id = $1 AND is_active = true', [id]
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

// Update a product — only overwrites fields that were actually sent.
// COALESCE($1, column) means: use the new value if provided, otherwise keep the existing one.
// This prevents a partial update (e.g. only changing price) from wiping other fields to null.
const updateProduct = async (id, { name, description, price, image_url, category, stock_quantity }) => {
  const result = await pool.query(
    `UPDATE products
     SET name           = COALESCE($1, name),
         description    = COALESCE($2, description),
         price          = COALESCE($3, price),
         image_url      = COALESCE($4, image_url),
         category       = COALESCE($5, category),
         stock_quantity = COALESCE($6, stock_quantity)
     WHERE id = $7
     RETURNING *`,
    [name, description, price, image_url, category, stock_quantity, id]
  );
  return result.rows[0];
};

// Get ALL products including inactive ones — admin dashboard only
const getAllProductsAdmin = async () => {
  const result = await pool.query(
    'SELECT * FROM products ORDER BY created_at DESC'
  );
  return result.rows;
};

// Adjust stock quantity by a delta (positive = restock, negative = purchase deduction)
// Using delta instead of a direct SET prevents race conditions when two orders
// come in at the same time — both reads a value and one overwrites the other.
const adjustStock = async (id, delta) => {
  const result = await pool.query(
    `UPDATE products
     SET stock_quantity = stock_quantity + $1
     WHERE id = $2 AND is_active = true
     RETURNING *`,
    [delta, id]
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
  getAllProductsAdmin,
  getProductById,
  createProduct,
  updateProduct,
  adjustStock,
  deleteProduct,
};