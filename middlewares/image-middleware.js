var multer = require('multer');

module.exports.image = {
  storage: () => {
    var storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'public/images/');
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