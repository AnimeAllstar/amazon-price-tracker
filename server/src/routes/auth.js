const router = require('express').Router();
const controller = require('../controllers/auth');

router.post('/auth/google', controller.authUser);

module.exports = router;
