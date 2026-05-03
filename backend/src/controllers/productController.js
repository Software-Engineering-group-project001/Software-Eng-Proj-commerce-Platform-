const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

// @desc    Create a product (Admin only)
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const { name, description, price, image_url, category, stock_quantity } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Product name is required' });
    }
    // Explicitly reject missing, zero, and negative prices
    if (price === undefined || price === null || Number(price) <= 0) {
      return res.status(400).json({ message: 'Price must be greater than 0' });
    }
    // stock_quantity is optional but if provided must be a non-negative integer
    if (stock_quantity !== undefined && stock_quantity !== null) {
      if (isNaN(Number(stock_quantity)) || Number(stock_quantity) < 0) {
        return res.status(400).json({ message: 'stock_quantity must be a non-negative number' });
      }
    }

    const product = await Product.createProduct({
      name, description, price, image_url, category, stock_quantity
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

// @desc    Update a product (Admin only)
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, image_url, category, stock_quantity } = req.body;

    // If price is being updated, it must still be greater than 0
    if (price !== undefined && price !== null && Number(price) <= 0) {
      return res.status(400).json({ message: 'Price must be greater than 0' });
    }
    // If stock_quantity is being updated, it must be a non-negative number
    if (stock_quantity !== undefined && stock_quantity !== null) {
      if (isNaN(Number(stock_quantity)) || Number(stock_quantity) < 0) {
        return res.status(400).json({ message: 'stock_quantity must be a non-negative number' });
      }
    }

    const updated = await Product.updateProduct(req.params.id, {
      name, description, price, image_url, category, stock_quantity
    });

    if (!updated) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// @desc    Delete a product (Admin only)
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.deleteProduct(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

// @desc    Get ALL products including inactive ones (Admin only)
// @route   GET /api/products/admin/all
// @access  Private/Admin
const getAllProductsAdmin = async (req, res) => {
  try {
    const products = await Product.getAllProductsAdmin();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// @desc    Adjust stock quantity by a delta
// @route   PATCH /api/products/:id/stock
// @access  Private/Admin
// Body: { delta: number }  e.g. { delta: -1 } to deduct one on purchase
const adjustStock = async (req, res) => {
  try {
    const { delta } = req.body;

    if (delta === undefined || delta === null || isNaN(Number(delta))) {
      return res.status(400).json({ message: 'delta is required and must be a number' });
    }

    const updated = await Product.adjustStock(req.params.id, Number(delta));
    if (!updated) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (updated.stock_quantity < 0) {
      // Roll back — we never want negative stock
      await Product.adjustStock(req.params.id, -Number(delta));
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error adjusting stock', error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getAllProductsAdmin,
  getProductById,
  createProduct,
  updateProduct,
  adjustStock,
  deleteProduct,
};