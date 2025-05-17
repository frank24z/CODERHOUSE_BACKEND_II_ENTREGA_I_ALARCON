const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');

const JWT_SECRET = process.env.JWT_SECRET || 'coderBackendSecret';

const getJWTStrategy = (passport) => {
  passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
  }, async (payload, done) => {
    try {
      return done(null, payload.user);
    } catch (err) {
      return done(err, false);
    }
  }));
};

module.exports = { getJWTStrategy };
