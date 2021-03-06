var express = require('express');
var session = require('express-session')({secret: 'test1', saveUninitialized: true, resave: true});
const bodyParser = require('body-parser');
var moment = require('moment');
var app = express();
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const readline = require('readline')

const rl = readline.createInterface({ input: process.stdin, output: process.stdout  });

var sess;

app.use(session);
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var imageRouter = require('./routes/image-route');
var authRouter = require('./routes/auth-route');
var userRouter = require('./routes/user-route');
var chatRouter = require('./routes/chat-route');

imageRouter.get('/time', (req, res) => {
  if(sess) {
    res.send('Time is:' + moment(Date.now()).format('lll'));
  } else {
    res.send('Please login');
  }
});


app.use('/', imageRouter);
app.use('/', authRouter);
app.use('/', userRouter);
app.use('/', chatRouter);

const server = require('http').createServer(app)
const socketio = require('socket.io')
const io = socketio(server)

sharedsession = require("express-socket.io-session");

io.use(sharedsession(session));

io.on('connection', socket => {
  io.emit('message', {
    text: `${socket.handshake.session.user} has joined!`,
    username: 'System',
    createdAt: new Date()
  })

  socket.on('new-chat-message', (message, callback) => {
    io.emit('message', {
      text: message,
      username: socket.handshake.session.user,
      createdAt: new Date()
    })
    callback()
  })

  socket.on('disconnect', () => {
    io.emit('message', {
      text: `${socket.handshake.session.user} has left!`,
      username: 'System',
      createdAt: new Date()
    })
  })
})

const argv = yargs(hideBin(process.argv)).argv;

const deploy = (port) => {
  server.listen(port, () => {
    console.log(`App Started on PORT ${port}`);
  });
}

if (!!argv.port) {
    deploy(argv.port);
} else {
    rl.question('What port do you want to run on? ', (answer) => {
        deploy(answer || process.env.PORT || 3000);
    });
}