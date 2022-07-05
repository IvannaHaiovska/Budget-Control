var express = require('express');
var app = express();
var bodyParser = require('body-parser');
localStrategy = require("passport-local");
 const passport = require('passport');
var session = require('express-session');

app.use(function (req, res, next) {
  res.header({
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Authorization': 'Bearer szdp79a2kz4wh4frjzuqu4sz6qeth8m3',
    'access-control-allow-credentials': true,
  });
  // update to match the domain you will make the request from
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var auth = require('./src/backend/routes/auth');

// passport config
require('./src/backend/config/passport')
// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
// default route
app.get('/', function (req, res) {
  return res.send({
    error: true,
    message: 'hello'
  })
});

app.use('/auth', auth);

// set port
app.listen(3000, function () {
  console.log('Node app is running on port 3000');
});
require('./src/backend/routes/users')(app);
app.listen();

module.exports = app;
