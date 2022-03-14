var multer  = require('multer');
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);
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
  deleteImage:  (req, res) => {
    imageModel.deleteImage(req.params.id, (fileName, msg) => {
      if (fileName) {
        unlinkAsync(imageMiddleware.image.imagePath + fileName);
      }
      imageModel.getImages((data) => {
        res.render('image-list.ejs', { alertMsg: msg, data: data } )
      })
    })
  },
  storeImage: (req, res) => {
    var upload = multer({
                // storage: imageMiddleware.image.storage(), 
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
          var inputValues = {
            image_name: req.file.originalname,
            image: req.file.buffer.toString('base64'),
          }
          imageModel.storeImage(inputValues, (data) => {
            res.render('upload-form.ejs', { alertMsg: data } )
          })
        }   
      }
    )
  }
}