const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({
    email: email
  });
  if (!user) {
    return res.redirect('/login');
  }
  const validPassword = await bcrypt.compare(password, user.password);

  if (validPassword) {
    req.session.isLoggedIn = true;
    req.session.user = user;
    return req.session.save(err => {
      res.redirect('/');
    });
  }
  return res.redirect('/login');
};

exports.postSignup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const userDoc = await User.findOne({
    email: email
  });
  if (userDoc) {
    return res.redirect('/signup');
  }
  const salt = await bcrypt.genSalt(12);
  const hashed = await bcrypt.hash(password, salt);
  const user = new User({
    email: email,
    password: hashed,
    cart: []
  });
  const saved = await user.save();
  console.log(saved);
  return res.redirect('/login');
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};