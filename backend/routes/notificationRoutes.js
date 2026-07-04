// routes/notificationRoutes.js
const express = require('express');
const router  = express.Router();
const { verifyToken } = require('../middleware/auth');
const {
  getNotifications,
  markAllRead,
  markOneRead,
} = require('../controllers/notificationController');

router.get('/',             verifyToken, getNotifications);
router.put('/read-all',     verifyToken, markAllRead);
router.put('/:id/read',     verifyToken, markOneRead);

module.exports = router;
