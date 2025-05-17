const Reservation = require('../dao/models/Reservation');
const Room = require('../dao/models/Room');

// Crear nueva reserva (solo huéspedes)
const createReservation = async (req, res) => {
  const { id } = req.params; // ID de la habitación
  const { dateIn, dateOut } = req.body;

  await Reservation.create({
    guest: req.user._id,
    room: id,
    dateIn,
    dateOut
  });

  res.redirect('/profile'); 
};


const getUserReservations = async (req, res) => {
  const reservations = await Reservation.find({ guest: req.user._id })
    .populate('room')
    .lean();

  res.render('profile', { user: req.user, reservations });
};

module.exports = {
  createReservation,
  getUserReservations
};
