const router = require('express').Router();
const userController = require('../controller/controlerUser.js');

// Register
router.post('/register', userController.register);

// Login
router.post('/login', userController.login);

// Logout
router.post('/logout', userController.logout);

// Me (get user profile)
router.get('/me', userController.me);

module.exports = router;
