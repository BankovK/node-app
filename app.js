var express = require('express');
var session = require('express-session');
const bodyParser = require('body-parser');
var moment = require('moment');
const router = express.Router();
var app = express();

const mysql = require("mysql");

var sess;

app.use(session({secret: 'test1', saveUninitialized: true, resave: true}));
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));

const pool = mysql.createPool({
 connectionLimit: 100,
 host: "127.0.0.1",
 port: "3306",
 user: "root",
 password: "greattest",
 database: "kfc-db",
 debug: true,
});

router.post('/login', (req, res) => {
  sess = req.session;
  res.end('login successful');
});

router.get('/time', (req, res) => {
  if(sess) {
    res.send('Time is:' + moment(Date.now()).format('lll'));
  } else {
    res.send('Please login');
  }
});

router.get('/data', (req, res) => {
  if(!sess) {
    res.send('Please login');
    return;
  }
  pool.query("SELECT name from `kfc-db`.products LIMIT 10", (err, rows) => {
    if (err) {
      console.log("Error occurred during the connection.");
      console.log(err);
    }
    res.send(rows);
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err) {
        return console.log(err);
    }
    sess = null;
    res.end('You have logged out.');
  });
});

app.use('/', router);

var server = app.listen(process.env.PORT || 3000,() => {
  console.log(`App Started on PORT ${process.env.PORT || 3000}`);
});