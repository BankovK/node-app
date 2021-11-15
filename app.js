var express = require('express');
var moment = require('moment');
var app = express();

const mysql = require("mysql");

const pool = mysql.createPool({
 connectionLimit: 100,
 host: "127.0.0.1",
 port: "3306",
 user: "root",
 password: "greattest",
 database: "kfc-db",
 debug: true,
});

app.get('/time', function(req, res) {
  res.send('Time is:' + moment(Date.now()).format('lll'));
});

app.get('/data', function(req, res) {
  pool.query("SELECT name from `kfc-db`.products LIMIT 10", (err, rows) => {
    if (err) {
      console.log("Error occurred during the connection.");
      console.log(err);
    }
    res.send(rows);
  });
});

var server = app.listen(3000,function() {});