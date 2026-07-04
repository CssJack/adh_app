const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../config/db');


// ======================================
// REGISTER
// ======================================
const register = async (req, res) => {

  try {

    const {
      name,
      email,
      phone,
      password
    } = req.body;

    // Check existing user
    const [existingUsers] = await db.query(
      'SELECT * FROM users WHERE phone = ? OR email = ?',
      [phone, email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await db.query(`
      INSERT INTO users
      (name, email, phone, password)
      VALUES (?, ?, ?, ?)
    `, [
      name,
      email,
      phone,
      hashedPassword
    ]);

    res.json({
      success: true,
      message: 'User registered successfully'
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};


// ======================================
// LOGIN
// ======================================
const login = async (req, res) => {

  try {

    const {
      phone,
      password
    } = req.body;

    // Find user by phone
    const [users] = await db.query(
      'SELECT * FROM users WHERE phone = ?',
      [phone]
    );

    if (users.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number'
      });
    }

    const user = users[0];

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid password'
      });
    }

    // Create token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
      }
    );

    res.json({
      success: true,
      token,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};


// ======================================
// GET ME
// ======================================
const getMe = async (req, res) => {

  try {

    const [users] = await db.query(
      'SELECT id, name, email, phone, role FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user: users[0]
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};


module.exports = {
  register,
  login,
  getMe
};