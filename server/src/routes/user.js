const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');

const userController = require('../controllers/user');
const userMiddleware = require('../middleware/user');

router.post('/signup', userMiddleware.validate, userController.signup);

router.post('/signin', userMiddleware.validate, userController.signin);

router.post('/signout', userController.signout);

router.post('/token', userController.verifyToken);

router.put('/:userId', upload.single('image'), userController.editUser);

router.get('/', userController.getUsers);

module.exports = router;