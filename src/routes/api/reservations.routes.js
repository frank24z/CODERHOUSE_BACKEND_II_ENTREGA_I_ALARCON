const express = require('express');
const passport = require('passport');
const {
  createReservation,
  getUserReservations
} = require('../../controllers/reservation.controller');

const router = express.Router();


router.post('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => req.user.role === 'guest' ? next() : res.sendStatus(403),
  createReservation
);


router.get('/my',
  passport.authenticate('jwt', { session: false }),
  getUserReservations
);

module.exports = router;
