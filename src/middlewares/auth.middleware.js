const passport = require('passport');

/**
 * Middleware para autenticar al usuario con JWT.
 * Este debe ir antes de cualquier ruta protegida.
 */
const authenticateJWT = passport.authenticate('jwt', { session: false });

/**
 * Middleware para autorizar a usuarios con un rol específico.
 * @param {String} role - Rol requerido para acceder (ej: 'admin', 'guest').
 */
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
