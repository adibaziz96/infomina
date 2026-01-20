const express = require('express');
const router = express.Router();

router.use('/auth', require('../modules/auth/auth.routes'));
router.use('/members', require('../modules/members/member.routes'));

module.exports = router;
