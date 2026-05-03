const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getAllProductsAdmin,
  getProductById,
  createProduct,
  updateProduct,
  adjustStock,
  deleteProduct,
} = require('../controllers/productController');

// ─── Auth Middleware (provided by Love Nepali's auth module) ─────────────────
// verifyToken  → checks that the user is logged in (valid JWT)
// isAdmin      → checks that the logged-in user has the 'admin' role
// These will be imported from the auth middleware file once it exists.
// Placeholder so routes are wired and testable in the meantime.
const verifyToken = (req, res, next) => next(); // TODO: replace with real middleware
const isAdmin    = (req, res, next) => next(); // TODO: replace with real middleware

// ─── Public Routes (anyone can access) ───────────────────────────────────────

// GET /api/products         → returns all active products
router.get('/', getAllProducts);

// GET /api/products/:id     → returns a single product by ID
router.get('/:id', getProductById);

// ─── Admin-Only Routes (must be logged in AND have admin role) ────────────────
// verifyToken runs first to confirm the user is authenticated.
// isAdmin runs second to confirm they have admin privileges.
// If either check fails, the request is rejected before reaching the controller.

// GET /api/products/admin/all → returns every product including inactive ones (admin dashboard)
// IMPORTANT: this route must be defined BEFORE /:id — Express matches routes top to bottom,
// so if /:id came first, the string "admin" would be treated as an ID parameter.
router.get('/admin/all', verifyToken, isAdmin, getAllProductsAdmin);

// POST /api/products        → create a new product
router.post('/', verifyToken, isAdmin, createProduct);

// PUT /api/products/:id     → update an existing product
router.put('/:id', verifyToken, isAdmin, updateProduct);

// DELETE /api/products/:id  → soft-delete a product (marks is_active = false)
router.delete('/:id', verifyToken, isAdmin, deleteProduct);

// PATCH /api/products/:id/stock → adjust stock by a delta { delta: number }
// Requires login (verifyToken) but NOT admin — the server-side order flow needs to call
// this when a purchase is made, and that process runs as an authenticated user, not an admin.
router.patch('/:id/stock', verifyToken, adjustStock);

module.exports = router;
