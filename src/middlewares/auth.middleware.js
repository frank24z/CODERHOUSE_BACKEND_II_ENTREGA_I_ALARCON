const passport = require('passport');


const authenticateJWT = passport.authenticate('jwt', { session: false });


const authorizeRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ status: 'error', message: 'No autenticado' });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ status: 'error', message: 'Acceso denegado: solo para ' + role });
    }

    next();
  };
};

module.exports = {
  authenticateJWT,
  authorizeRole
};
