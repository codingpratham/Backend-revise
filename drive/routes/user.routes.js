const express = require('express');
const User = require('../models/user.model.js');
const router = express.Router();

// GET register form (optional if you're using forms)
router.get('/register', (req, res) => {
  res.render('register');
});

// POST register
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  if (!email.includes('@')) {
    return res.status(400).json({ message: 'Please enter a valid email' });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ username, email, password });

  if (!user) {
    return res.status(400).json({ message: 'User not created' });
  }

  res.status(201).json({ message: 'User created successfully' });
});

module.exports = router;
