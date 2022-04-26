var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/user');
const { status } = require('express/lib/response');

var router = express.Router();
router.use(bodyParser.json());


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Hello there! Please respond with a resource');
});

router.post('/signup', (req,res,next) =>{
  User.findOne({username: req.body.username})
  .then((User) => {
    if(User != null){
      res.status(400).json({message: 'Username already exists'});
    }
    else{
      User.create(req.body)
      .then((user) => {
        
      })
      .catch((err) => {
        next(err);
      });
    }
  }).then((user) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({status: 'User ' + req.body.username + ' was created'})
    , (err) => next(err)
  .catch((err) => next(err))
});
});
router.post('/login', (req,res,next) =>  {  
  if(!req.session.user) {
    var authHeader = req.headers.authorization;
  if (!authHeader) {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
      return;
  }

  var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  var user = auth[0];
  var pass = auth[1];
  user.findOne({username: user})
  .then((user) => {
    if( user === null) {
      var err = new Error('User' + user + ' does not exist!');
      err.statusCode = 403;
      next(err);
    }
    else if (user.password !== pass) {
      var err = new Error('Wrong password!');
      err.statusCode = 403;
      next(err);
    }
    else if (user.username === user && user.password === pass) {
      req.session.user = 'Authenticated';
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end('Logged in');
    }
  }) 
  .catch((err) => next(err))
}
else 
{
  if(req.session.user === 'Authenticated') 
  {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end('You are already logged in');
  }
  else
  {
    var err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');      
    err.status = 401;
    next(err);
  }
}
});

router.get('/logout', (req,res) => {
  if(req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
  }
});
module.exports = router;
