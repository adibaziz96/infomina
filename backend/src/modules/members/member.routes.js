const express = require('express');
const router = express.Router();
const MemberController = require('./member.controller');
const authenticate = require('../../middlewares/auth.middleware');

router.get('/', authenticate, MemberController.index);
router.post('/', authenticate, MemberController.store);
router.get('/:id', authenticate, MemberController.show);
router.put('/:id', authenticate, MemberController.update);
router.delete('/:id', authenticate, MemberController.destroy);

module.exports = router;
