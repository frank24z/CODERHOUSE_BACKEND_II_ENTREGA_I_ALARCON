const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  guest:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  room:    { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  dateIn:  { type: Date, required: true },
  dateOut: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reservation', reservationSchema);
