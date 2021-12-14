var db = require('../database');

module.exports = {
  getUsers: (callback) => {
    var sql='SELECT * FROM users';
    db.query(sql, (err, data, fields) => {
      if (err) throw err;
      callback(data);
    })
  },
  deleteUser:  (id, callback) => {
    var sql='SELECT * FROM users WHERE id =?';
    var msg = '';
    db.query(sql, id, (err, data, fields) => {
      if (err) throw err;
      if (!data.length) {
        msg = "This user doesn't exist";
      } else {
        var username = data[0].username;
        var sql = 'DELETE FROM users WHERE id =?';
        db.query(sql, id, (err, data) => {
            if (err) throw err;
        });
        msg = username + " is deleted successfully";
      }
      return callback(username, msg);
    })
  },
  getUser: (inputValues, callback) => {
    var sql='SELECT * FROM users WHERE username =? AND password =?';
    var msg = '';
    db.query(sql, [inputValues.username, inputValues.password], (err, data, fields) => {
      if (err) throw err;
      if (!data.length) {
        msg = inputValues.username + " can't be found";
      }
      return callback(data[0], msg);
    })
  },
  createUser: (inputValues, callback) => {
    var isError = false;
    var msg = '';
    var sql='SELECT * FROM users WHERE username =?';
    db.query(sql, inputValues.username, (err, data, fields) => {
      if (err) throw err;
      if (data.length > 0) {
        msg = inputValues.username + " is already exist";
        isError = true;
      } else {
        var sql = 'INSERT INTO users SET ?';
        db.query(sql, inputValues, function (err, data) {
          if (err) throw err;
        });
        msg = inputValues.username + " is created successfully";
      }
      return callback(msg, isError);
    })
  }
}