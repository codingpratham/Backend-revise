const express = require('express');
const User = require('../models/user.model.js');
const router = express.Router();
const bcrypt = require('bcrypt');

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

  const hashedPassword = await bcrypt.hash(password, 10);
  if (!hashedPassword) {
    return res.status(500).json({ message: 'Error hashing password' });
  }

  const user = await User.create(
    { username, email, password: hashedPassword },
  );

  if (!user) {
    return res.status(400).json({ message: 'User not created' });
  }

  res.status(201).json({ message: 'User created successfully' });
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const {email,password}  = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }
  res.status(200).json({ message: 'User found' });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  res.redirect('/')
  res.status(200).json({ message: 'Login successful' });
})

module.exports = router;
