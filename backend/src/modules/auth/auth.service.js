const userRepo = require('../users/user.repository');
const { compare } = require('../../utils/hash');
const { sign } = require('../../utils/token');

exports.login = async (email, password) => {
  const user = await userRepo.findByEmail(email);

  if (!user || !user.password) {
    return { success: false, message: 'Invalid email or password' };
  }

  const valid = await compare(password, user.password);
  if (!valid) {
    return { success: false, message: 'Invalid email or password' };
  }

  const token = sign({ id: user.id, email: user.email });

  return { success: true, token };
};
