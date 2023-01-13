var createError = require('http-errors'),
cookieParser = require('cookie-parser'),
express = require('express'),
path = require('path'),
cookieParser = require('cookie-parser'),
logger = require('morgan'),
session = require('express-session'),
FileStore = require('session-file-store')(session);


const MongoClient = require('mongodb').MongoClient,
mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const Dishes = require('./models/dishes');

// mongoDB connection and setup
const uri = "mongodb://127.0.0.1:27017/conFusion";
const connect = mongoose.connect(uri);
connect.then((db) => {
  console.log('Correctly connected to database');
}, (err) => {console.log(err); });

// Routes Handlers
var indexRouter = require('./routes/index'),
    usersRouter = require('./routes/usersRouter'),
    dishRouter = require('./routes/dishRouter'),
    promotionsRouter = require('./routes/promotions.js');
var app = express();

app.use(cookieParser('hello-there'));
app.use(session({
  name: 'admin',
  secret: 'this is the secret',
  saveUninitialized: false,
  resave: false,
  // store: new FileStore()
}));
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Basic authentication function 
function auth(req,res,next)
{
  console.log(req.session);
  if(!req.session.user){
      var err = new Error('You are not authenticated');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
  }
  else
  {
    if(req.session.user == 'authenticated')
    {
      console.log('req.session: ',req.session);
      next();
    }
    else
    {
      var err = new Error('You are not authenticated');
      err.status = 403;
      next(err);
    }
  }}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// tempelating engine
app.set('view engine', 'jade');

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app using the authentication as a middleware before going to the endpoints
app.use(auth);

// Routes middleware

app.use('/dishes', dishRouter);
app.use('/promotions', promotionsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
