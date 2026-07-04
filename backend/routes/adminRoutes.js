// routes/adminRoutes.js
const express    = require('express');
const router     = express.Router();
const { adminOnly } = require('../middleware/adminAuth');

const {
  createProduct, updateProduct, deleteProduct,
  getAllUsers, getStats,
} = require('../controllers/adminController');

const {
  getAllOrders,
  assignOrder,
  updateOrderStatus,
} = require('../controllers/adminOrderController');

// ── Products ──────────────────────────────────────────────────────────────────
router.get('/stats',             adminOnly, getStats);
router.get('/users',             adminOnly, getAllUsers);
router.post('/products',         adminOnly, createProduct);
router.put('/products/:id',      adminOnly, updateProduct);
router.delete('/products/:id',   adminOnly, deleteProduct);

// ── Orders ────────────────────────────────────────────────────────────────────
router.get('/orders',                    adminOnly, getAllOrders);
router.post('/orders/:id/assign',        adminOnly, assignOrder);
router.put('/orders/:id/status',         adminOnly, updateOrderStatus);

module.exports = router;
