const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: String,
  pricePerNight: { type: Number, required: true },
  capacity:    { type: Number, required: true },
  available:   { type: Boolean, default: true }
});

module.exports = mongoose.model('Room', roomSchema);
