// server.js – ADH Hardware Store Backend
require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const authRoutes         = require('./routes/authRoutes');
const productRoutes      = require('./routes/productRoutes');
const cartRoutes         = require('./routes/cartRoutes');
const orderRoutes        = require('./routes/orderRoutes');
const adminRoutes        = require('./routes/adminRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── CORS ──────────────────────────────────────────────────────────────────────
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    const allowed = [
      process.env.CLIENT_URL || 'http://localhost:5173',
      'http://localhost:5173',
      'http://localhost:3000',
      'http://127.0.0.1:5500',
      'http://localhost:5500',
    ];
    if (allowed.includes(origin) || origin.startsWith('file://')) {
      return callback(null, true);
    }
    return callback(null, true); // Open for dev — restrict in production
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth',           authRoutes);
app.use('/api',                productRoutes);
app.use('/api/cart',           cartRoutes);
app.use('/api/orders',         orderRoutes);
app.use('/api/admin',          adminRoutes);
app.use('/api/notifications',  notificationRoutes);

// ── Convenience aliases (keep backward compat with admin.html) ────────────────
app.put('/api/products/:id',    require('./middleware/adminAuth').adminOnly, require('./controllers/adminController').updateProduct);
app.delete('/api/products/:id', require('./middleware/adminAuth').adminOnly, require('./controllers/adminController').deleteProduct);
app.post('/api/products',       require('./middleware/adminAuth').adminOnly, require('./controllers/adminController').createProduct);
app.get('/api/orders/all',      require('./middleware/adminAuth').adminOnly, require('./controllers/adminOrderController').getAllOrders);
app.get('/api/users',           require('./middleware/adminAuth').adminOnly, require('./controllers/adminController').getAllUsers);

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) =>
  res.json({ status: 'ok', message: 'ADH Backend is running 🟢', timestamp: new Date() })
);

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((req, res) =>
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.url} not found.` })
);

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀  ADH Backend running on http://localhost:${PORT}`);
  console.log(`📦  Products API:      http://localhost:${PORT}/api/products`);
  console.log(`🛒  Orders API:        http://localhost:${PORT}/api/orders`);
  console.log(`🔔  Notifications API: http://localhost:${PORT}/api/notifications`);
  console.log(`🔑  Health:            http://localhost:${PORT}/api/health\n`);
});
