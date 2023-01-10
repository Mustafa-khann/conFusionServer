var express = require('express');

var usersRouter = express.Router();
const Users = require('../models/users');
const users = require('../models/users');
const { Router } = require('express');

usersRouter.post('/signup', (req,res,next) => {
    Users.find({username: req.body.username})
    .then((user) => {
        if(user != null)
        {
            var err = new Error('User already exists!');
            err.status = 403;
            next(err)
        }
        else
        {
            return Users.create({
                username: req.body.username,
                password: req.body.password
            })
            .then((user) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({status: 'Registration Successful!', user: user})
            }, (err) => next(err))
            .catch((err) => next(err));
        }
    })
});

usersRouter.post('/login', (req,res,next) => {
    if(!req.session.user)
    {
        var authHeader = req.headers.authorization;

        if(!authHeader)
        {
            var err = new Error('You are not authenticted!');
            res.setHeader('WWW-authenticate', 'Basic');
            err.status = 403;
            return next(err)
        }

        var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
        var username = auth[0];
        var password = auth[1];

        Users.findOne({username: username})
        .then((user) => {
            if(user == null)
            {
                var err = new Error('User ',username,' doesn\'t exist!');
                err.status = 403;
                next(err)
            }
            else if(user.password != password)
            {
                var err = new Error('Incorrect password!');
                err.status = 403;
                next(err)
            }
            else if(user.username === username && user.password === password)
            {
                req.session.user = 'authenticated';
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.end('You are authenticated');
            }
        })
        .catch((err) => next(err))
    }
    else
    {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end('You are already logged in!');
    }
})

usersRouter.get('/logout', (req,res) => {
    if(req.session)
    {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    }
    else
    {
        var err = new Error('You are already Logged out!');
        err.status = 403;
        next(err)
    }
});
module.exports = usersRouter;
