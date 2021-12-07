var express = require('express');
var session = require('express-session');
const bodyParser = require('body-parser');
var moment = require('moment');
var app = express();

var sess;

app.use(session({secret: 'test1', saveUninitialized: true, resave: true}));
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var imageRouter = require('./routes/image-route');
var authRouter = require('./routes/auth-route');

imageRouter.get('/time', (req, res) => {
  if(sess) {
    res.send('Time is:' + moment(Date.now()).format('lll'));
  } else {
    res.send('Please login');
  }
});


app.use('/', imageRouter);
app.use('/', authRouter);

var server = app.listen(process.env.PORT || 3000,() => {
  console.log(`App Started on PORT ${process.env.PORT || 3000}`);
});