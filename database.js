const mysql = require("mysql");

const conn = mysql.createConnection({
  connectionLimit: 100,
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "greattest",
  database: "kfc-db",
  // debug: true,
});
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully!');
});

module.exports = conn;