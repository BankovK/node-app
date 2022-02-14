const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.get('/chat', authMiddleware.auth, chatController.chat)

module.exports = router;