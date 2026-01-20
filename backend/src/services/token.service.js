const jwt = require('jsonwebtoken');

class TokenService {
  verifyAccessToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }

  generateAccessToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '15m',
    });
  }
}

module.exports = new TokenService();
