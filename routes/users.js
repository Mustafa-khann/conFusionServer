var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/user');
const { status } = require('express/lib/response');

var router = express.Router();
router.use(bodyParser.json());


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req,res,next) =>{
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
  }).then((user) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({status: 'User ' + req.body.username + ' was created'})
    , (err) => next(err)
  .catch((err) => next(err));
});
});
router.post('/login', (req,res,next) =>  {  
  
});
module.exports = router;
