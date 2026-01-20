const { jwtSecret, jwtExpire } = require('./env');

module.exports = {
  secret: jwtSecret,
  expiresIn: jwtExpire
};
