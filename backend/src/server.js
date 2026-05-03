const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());          // allows the React frontend to call this API
app.use(express.json());  // parses incoming JSON request bodies

// ─── Routes ───────────────────────────────────────────────────────────────────
// Each route file handles a specific resource.
// More routes (auth, orders, payments) will be added by other team members.
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// ─── 404 Handler ──────────────────────────────────────────────────────────────
// Catches any request that didn't match a defined route.
// Must be placed AFTER all route registrations.
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.originalUrl} not found` });
});

// ─── Global Error Handler ──────────────────────────────────────────────────────
// Express recognises a 4-argument middleware as an error handler.
// Any route that calls next(error) — or throws inside async code caught by Express 5 —
// will land here instead of crashing the process.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
  });
});

// ─── Database Init + Server Start ─────────────────────────────────────────────
// We import the Product model to run createProductTable() on startup.
// This creates the products table if it doesn't already exist — safe to call
// every time because the SQL uses CREATE TABLE IF NOT EXISTS.
const Product = require('./models/Product');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await Product.createProductTable();
    console.log('Products table ready.');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
