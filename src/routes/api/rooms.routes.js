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

// Ver habitaciones
router.get('/', getAllRooms);

// Admin: crear habitación
router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => req.user.role === 'admin' ? next() : res.sendStatus(403),
  createRoom
);

// Admin: editar habitación
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

// Admin: eliminar
router.get('/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => req.user.role === 'admin' ? next() : res.sendStatus(403),
  deleteRoom
);

module.exports = router;
