const router = require('express-promise-router')();
const userController = require('../controllers/users.controller');
const verify = require('./auth/auth');

router.post('/signup', userController.signup);

router.post('/signin', userController.signin);

router.delete('/user/toogle', verify, userController.toggleUser);

module.exports = router;