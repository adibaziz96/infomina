const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpire } = require('../config/env');

exports.sign = (payload) => {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid payload for JWT');
  }
  return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire });
};

exports.verify = (token) => {
  if (!token) throw new Error('Token missing');
  return jwt.verify(token, jwtSecret);
};
