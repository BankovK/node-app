var db = require('../database');

module.exports = { 
  getUser: (inputValues, callback) => {
    var sql='SELECT * FROM users WHERE username =? AND password =?';
    db.query(sql, [inputValues.username, inputValues.password], (err, data, fields) => {
      if (err) throw err;
      if (!data.length) {
        var msg = inputValues.username + " can't be found";
      }
      return callback(data, msg);
    })
  }
}