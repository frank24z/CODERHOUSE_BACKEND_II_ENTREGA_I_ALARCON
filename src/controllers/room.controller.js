const Room = require('../dao/models/Room');

const getAllRooms = async (req, res) => {
  const rooms = await Room.find().lean();
  res.render('rooms', { rooms, user: req.user });
};


const createRoom = async (req, res) => {
  const { name, description, pricePerNight, capacity } = req.body;
  await Room.create({ name, description, pricePerNight, capacity });
  res.redirect('/rooms');
};


const editRoomForm = async (req, res) => {
  const room = await Room.findById(req.params.id).lean();
  res.render('editRoom', { room });
};

const updateRoom = async (req, res) => {
  const { name, description, pricePerNight, capacity } = req.body;
  await Room.findByIdAndUpdate(req.params.id, { name, description, pricePerNight, capacity });
  res.redirect('/rooms');
};


const deleteRoom = async (req, res) => {
  await Room.findByIdAndDelete(req.params.id);
  res.redirect('/rooms');
};

module.exports = {
  getAllRooms,
  createRoom,
  editRoomForm,
  updateRoom,
  deleteRoom
};
