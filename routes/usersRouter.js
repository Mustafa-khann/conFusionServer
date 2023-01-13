var express = require('express'),
    bodyParser = require('body-parser'),
    User = require('../models/users'),
    router = express.Router();

router.use(bodyParser.json());


router.get('/', (req,res,next) => {
    res.send('respond with a resource');
});

router.post('/signup', (req,res,next) => {
    User.findOne({username: req.body.username})
    .then((user) => {
        if(user != null)
        {
            var err = new Error (req.body.username, ' already exists!');
            err.status = 403;
            next(err);
        }
        else{
            return User.create({
                username: req.body.username,
                password: req.body.password,
            })
        }
    })
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({status: 'Registration Successful', user: user});
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.post('/login', (req,res,next) => {

    if(!req.session.user){
        var authHeaders = req.headers.authorization;
        if(!authHeaders)
        {
          var err = new Error('You are not authenticated');
          res.setHeader('WWW-Authenticate', 'Basic');
          err.status = 401;
          next(err);
          return;
        }
      
        var auth = new Buffer.from(authHeaders.split(' ')[1], 'base64').toString().split(':');
        var username = auth[0];
        var password = auth[1];
      User.findOne({username: username})
      .then((user) => {
        if(user === null)
        {
            var err = new Error('User doesn\'t exist!');
            err.status = 404;
            next(err);
        }
        else if(user.password !== password)
        {
            var err = new Error('Incorrect Password!');
            err.status = 403;
            next(err);
        }
        else if(username == username && password == password)
        {
            req.session.user = 'authenticated';
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('You are logged in!')
            next();
        }
        else
        {
          var err = new Error('You are not authenticated');
          res.setHeader('WWW-authenticate', 'Basic');
          err.status = 401;
          return next(err);
        }
      })
      .catch((err) => next(err));
    }
    else
    {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('You are already logged in!');
    }
});

router.get('/logout', (req,res) => {
    if(req.session)
    {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    }
    else
    {
        var err = new Error('You are already logged out!');
        err.status = 403;
        next(err);
    }
});

module.exports = router;