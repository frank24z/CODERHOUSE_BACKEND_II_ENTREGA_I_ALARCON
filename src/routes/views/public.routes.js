const express = require('express');
const passport = require('passport');
const Room = require('../../dao/models/Room');
const { getUserReservations } = require('../../controllers/reservation.controller');

const router = express.Router();

// Página de inicio
router.get('/', (req, res) => {
  res.render('home');
});

// Página de login
router.get('/login', (req, res) => {
  res.render('login');
});

// Página de registro
router.get('/register', (req, res) => {
  res.render('register');
});

// Página de perfil (requiere login con JWT)
router.get('/profile',
  passport.authenticate('jwt', { session: false }),
  getUserReservations
);

// Página de habitaciones (requiere login para mostrar opciones)
router.get('/rooms',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const rooms = await Room.find().lean();
      res.render('rooms', { rooms, user: req.user });
    } catch (err) {
      res.status(500).send('Error al cargar habitaciones');
    }
  }
);

module.exports = router;
