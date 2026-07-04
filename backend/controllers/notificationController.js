// controllers/notificationController.js

const db = require('../config/db');

// ── GET /api/notifications ─────────────────────────────────────────────────────
const getNotifications = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT * FROM notifications
       WHERE user_id = ?
       ORDER BY created_at DESC
       LIMIT 50`,
      [req.user.id]
    );
    const [[{ unread }]] = await db.query(
      'SELECT COUNT(*) AS unread FROM notifications WHERE user_id = ? AND is_read = 0',
      [req.user.id]
    );
    return res.json({ success: true, data: rows, unread });
  } catch (err) {
    console.error('getNotifications:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// ── PUT /api/notifications/read-all ──────────────────────────────────────────
const markAllRead = async (req, res) => {
  try {
    await db.query(
      'UPDATE notifications SET is_read = 1 WHERE user_id = ?',
      [req.user.id]
    );
    return res.json({ success: true, message: 'All notifications marked as read.' });
  } catch (err) {
    console.error('markAllRead:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// ── PUT /api/notifications/:id/read ──────────────────────────────────────────
const markOneRead = async (req, res) => {
  try {
    await db.query(
      'UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    return res.json({ success: true });
  } catch (err) {
    console.error('markOneRead:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = { getNotifications, markAllRead, markOneRead };
