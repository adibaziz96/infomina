const User = require('./user.model');

module.exports = {
  findByEmail: async (email) => {
    return await User.findOne({ where: { email } });
  }
};
