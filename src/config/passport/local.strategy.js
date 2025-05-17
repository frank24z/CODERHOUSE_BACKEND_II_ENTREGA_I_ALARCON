const LocalStrategy = require('passport-local').Strategy;
const User = require('../../dao/models/User');
const { createHash, isValidPassword } = require('../../utils/encryption');

const getLocalStrategies = (passport) => {
  passport.use('register', new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return done(null, false);

        const newUser = await User.create({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email,
          password: createHash(password)
        });

        return done(null, newUser);
      } catch (err) {
        return done(err);
      }
    }
  ));

  passport.use('login', new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user || !isValidPassword(user, password)) return done(null, false);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));
};

module.exports = { getLocalStrategies };
