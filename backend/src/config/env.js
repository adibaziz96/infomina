module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'supersecret',
  jwtExpire: '1h'
};
