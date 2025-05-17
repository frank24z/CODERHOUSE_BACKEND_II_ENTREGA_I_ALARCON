const Room = require('../dao/models/Room');

// Mostrar todas las habitaciones
const getAllRooms = async (req, res) => {
  const rooms = await Room.find().lean();
  res.render('rooms', { rooms, user: req.user });
};

// Crear una nueva habitación (solo admin)
const createRoom = async (req, res) => {
  const { name, description, pricePerNight, capacity } = req.body;
  await Room.create({ name, description, pricePerNight, capacity });
  res.redirect('/rooms');
};

// Mostrar formulario para editar
const editRoomForm = async (req, res) => {
  const room = await Room.findById(req.params.id).lean();
  res.render('editRoom', { room });
};

// Actualizar habitación
const updateRoom = async (req, res) => {
  const { name, description, pricePerNight, capacity } = req.body;
  await Room.findByIdAndUpdate(req.params.id, { name, description, pricePerNight, capacity });
  res.redirect('/rooms');
};

// Eliminar habitación
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
