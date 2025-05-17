const express = require('express');
const passport = require('passport');
const {
  getAllRooms,
  createRoom,
  editRoomForm,
  updateRoom,
  deleteRoom
} = require('../../controllers/room.controller');

const router = express.Router();


router.get('/', getAllRooms);


router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => req.user.role === 'admin' ? next() : res.sendStatus(403),
  createRoom
);


router.get('/edit/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => req.user.role === 'admin' ? next() : res.sendStatus(403),
  editRoomForm
);

router.post('/edit/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => req.user.role === 'admin' ? next() : res.sendStatus(403),
  updateRoom
);


router.get('/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => req.user.role === 'admin' ? next() : res.sendStatus(403),
  deleteRoom
);

module.exports = router;
