const express = require('express');
const router = express.Router();
const imageController = require('../controllers/image-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.get('/store-image', authMiddleware.auth, imageController.imageUploadForm);
router.get('/stored-images', authMiddleware.auth, imageController.imageList);
router.post('/store-image', authMiddleware.auth, imageController.storeImage);
router.post('/delete-image/:id', authMiddleware.auth, imageController.deleteImage);

module.exports = router;