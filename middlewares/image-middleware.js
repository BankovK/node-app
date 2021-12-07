var multer = require('multer');

var imagePath = 'public/images/';

module.exports.image = {
  imagePath,
  storage: () => {
    var storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, imagePath);
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      }
    })
    return storage;
  },
  allowedImage: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = 'Only image files are allowed!';
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
}