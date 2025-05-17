const express = require('express');
const passport = require('passport');
const { loginUser, currentUser } = require('../../controllers/session.controller');

const router = express.Router();

router.post('/register', passport.authenticate('register', { session: false }), (req, res) => {
  res.json({ status: 'success', message: 'Huésped registrado', user: req.user });
});

router.post('/login', passport.authenticate('login', { session: false }), loginUser);

router.get('/current', passport.authenticate('jwt', { session: false }), currentUser);

module.exports = router;
