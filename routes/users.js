var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/user')

var router = express.Router();
router.use(bodyParser.json());


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', function(req,res,next) {
  User.findOne({username: req.body.username})
  .then((User) => {
    if(User != NULL)
    {
      var err = new Error('User' + req.body.username + ' already exists!');
      err.statusCode = 403;
      next(err);
    }
    else{
      return User.create({user: req.body.username, password: req.body.password});
    }
  }).catch((err) => next(err));
});
module.exports = router;
