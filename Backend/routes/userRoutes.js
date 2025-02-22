const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

// Registration endpoint
router.post('/register', userController.register);

// Login endpoint
router.post('/login', userController.login);

// Protected profile endpoint
router.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: 'Profile data', user: req.user });
});

module.exports = router;
