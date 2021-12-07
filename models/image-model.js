var db = require('../database');

module.exports = { 
  storeImage: (inputValues, callback) => {
    var sql='SELECT * FROM images WHERE image_name =?';
    db.query(sql, inputValues.image_name, (err, data, fields) => {
      if (err) throw err;
      if (data.length > 1) {
        var msg = inputValues.image_name + " is already exist";
      } else {
        var sql = 'INSERT INTO images SET ?';
        db.query(sql, inputValues, function (err, data) {
            if (err) throw err;
        });
        var msg = inputValues.image_name + " is uploaded successfully";
      }
      return callback(msg);
    })
  },
  deleteImage:  (id, callback) => {
    var sql='SELECT * FROM images WHERE id =?';
    db.query(sql, id, (err, data, fields) => {
      if (err) throw err;
      if (!data.length) {
        var msg = "This photo doesn't exist";
      } else {
        var imageName = data[0].image_name;
        var sql = 'DELETE FROM images WHERE id =?';
        db.query(sql, id, (err, data) => {
            if (err) throw err;
        });
        var msg = imageName + " is deleted successfully";
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