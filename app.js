const createError = require('http-errors'),
express = require('express'),
path = require('path'),
cookieParser = require('cookie-parser'),
logger = require('morgan');


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
    usersRouter = require('./routes/users'),
    dishRouter = require('./routes/dishRouter');

var app = express();

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

// Routes middleware
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishRouter);
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
