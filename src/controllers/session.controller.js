const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'coderBackendSecret';

const loginUser = (req, res) => {
  const user = req.user;
  const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ status: 'success', token });
};

const currentUser = (req, res) => {
  res.json({ status: 'success', user: req.user });
};

module.exports = {
  loginUser,
  currentUser
};
