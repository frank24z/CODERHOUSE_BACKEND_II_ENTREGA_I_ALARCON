const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');

const getJWTStrategy = (passport) => {
  passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([
      ExtractJwt.fromAuthHeaderAsBearerToken(),
      req => req.cookies?.token  // 👈 ahora también busca en cookie
    ]),
    secretOrKey: process.env.JWT_SECRET
  }, async (payload, done) => {
    try {
      return done(null, payload.user);
    } catch (err) {
      return done(err, false);
    }
  }));
};

module.exports = { getJWTStrategy };
