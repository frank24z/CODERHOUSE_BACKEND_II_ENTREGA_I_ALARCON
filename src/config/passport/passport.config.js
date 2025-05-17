const passport = require('passport');
const { getLocalStrategies } = require('./local.strategy');
const { getJWTStrategy } = require('./jwt.strategy');

const initPassport = () => {
  getLocalStrategies(passport);
  getJWTStrategy(passport);
};

module.exports = { initPassport };
