const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { users, findUserByEmail, addUser } = require('../users');
const router = express.Router();

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (findUserByEmail(email)) {
    return res.send('Usuário já existe');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  addUser({
    id: Date.now().toString(),
    email,
    password: hashedPassword
  });
  res.redirect('/login');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  const user = findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.send('Credenciais inválidas');
  }
  req.login(user, (err) => {
    if (err) return next(err);
    return res.redirect('/auth/profile');
  });
});

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/login',
  successRedirect: '/auth/profile'
}));

router.get('/profile', isAuthenticated, (req, res) => {
  res.render('profile', { user: req.user });
});

router.post('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/login');
  });
});

module.exports = router;
