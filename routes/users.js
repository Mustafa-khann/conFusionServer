var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');

var router = express.Router();
router.use(bodyParser.json());


/* GET users listing. */
  router.get('/', function(req, res, next) {
  res.send('Hello there! Please respond with a resource');
});
router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
  req.body.password, (err, user) => {
    if(err) {
      return res.statusCode(500).
      json({err: err}).
      res.headers('Content-type', 'application/json');
    }
    else {
      passport.authenticate('local')(req, res, () => {
        return res.statusCode(200).
        json({success: true, status: 'Registration Successful!'}).
        res.setHeader('Content-Type', 'application/json');
      });
    }
  })
  .then((user) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({status: 'Registration Successful!', user: user});
  }, (err) => next(err))
  .catch((err) => next(err));
});

router.post('/login', passport.authenticate('local'), (req,res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, status: 'Login Successful!', user: req.user});
})

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

module.exports = router;
