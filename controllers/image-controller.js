var multer  = require('multer');
var imageMiddleware= require('../middlewares/image-middleware');
var imageModel= require('../models/image-model');

module.exports = {
  imageList: (req, res) => {
    imageModel.getImages((data) => {
      res.render('image-list.ejs', { data: data } )
    })   
  },
  imageUploadForm: (req, res) => {
    res.render('upload-form.ejs');
  },
  storeImage: (req, res) => {
    var upload = multer({
                storage: imageMiddleware.image.storage(), 
                allowedImage:imageMiddleware.image.allowedImage 
                }).single('image');
    upload(
      req,
      res,
      (err) => {
        if (err instanceof multer.MulterError) {
          res.send(err);
        } else if (err) {
          res.send(err);
        } else {
          var imageName = req.file.originalname;
          var inputValues = {
            image_name: imageName
          }
          imageModel.storeImage(inputValues, (data) => {
            res.render('upload-form.ejs', { alertMsg: data } )
          })   
        }   
      }
    )
  }
}