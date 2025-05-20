const express = require('express');
const passport = require('passport');
const Room = require('../../dao/models/Room');
const { getUserReservations } = require('../../controllers/reservation.controller');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

// ✅ Logout borra cookie y redirige
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

router.get('/profile',
  passport.authenticate('jwt', { session: false }),
  getUserReservations
);

router.get('/rooms',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const rooms = await Room.find().lean();
    res.render('rooms', { rooms, user: req.user });
  }
);

module.exports = router;
