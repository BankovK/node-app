const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.get('/register', userController.registerForm);
router.get('/users', authMiddleware.authAdmin, userController.userList);
router.post('/register', userController.createUser);
router.post('/delete-user/:id', authMiddleware.authAdmin, userController.deleteUser);

module.exports = router;