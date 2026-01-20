const bcrypt = require('bcryptjs');

exports.hash = (value) => bcrypt.hash(value, 10);
exports.compare = (value, hash) => bcrypt.compare(value, hash);
