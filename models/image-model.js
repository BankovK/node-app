var db = require('../database');

module.exports = { 
  storeImage: (inputValues, callback) => {
    var sql='SELECT * FROM images WHERE image_name =?';
    var msg = '';
    db.query(sql, inputValues.image_name, (err, data, fields) => {
      if (err) throw err;
      if (data.length > 0) {
        msg = inputValues.image_name + " is already exist";
      } else {
        var sql = 'INSERT INTO images SET ?';
        db.query(sql, inputValues, function (err, data) {
            if (err) throw err;
        });
        msg = inputValues.image_name + " is uploaded successfully";
      }
      return callback(msg);
    })
  },
  deleteImage:  (id, callback) => {
    var sql='SELECT * FROM images WHERE id =?';
    var msg = '';
    db.query(sql, id, (err, data, fields) => {
      if (err) throw err;
      if (!data.length) {
        msg = "This photo doesn't exist";
      } else {
        var imageName = data[0].image_name;
        var sql = 'DELETE FROM images WHERE id =?';
        db.query(sql, id, (err, data) => {
            if (err) throw err;
        });
        msg = imageName + " is deleted successfully";
      }
      return callback(imageName, msg);
    })
  },
  getImages: (callback) => {
    var sql='SELECT * FROM images';
    db.query(sql, (err, data, fields) => {
      if (err) throw err;
      callback(data);
    })
  }
}