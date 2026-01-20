const authService = require('./auth.service');
const { success, error } = require('../../utils/response');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const result = await authService.login(email, password);

  if (!result.success) {
    return error(res, result.message, 401);
  }

  return success(res, { token: result.token });
};
