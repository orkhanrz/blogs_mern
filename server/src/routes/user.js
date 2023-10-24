const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const userMiddleware = require('../middleware/user');

router.post('/signup', userMiddleware.validate, userController.signup);

router.post('/signin', userMiddleware.validate, userController.signin);

router.post('/signout', userController.signout);

router.post('/token', userController.verifyToken);

router.get('/', userController.getUsers);

module.exports = router;