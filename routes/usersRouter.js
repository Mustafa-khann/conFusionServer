var express = require('express');

var usersRouter = express.Router();
const Users = require('../models/users')
usersRouter.route('/')
.get((req,res,next) => {
    Users.find({})
    .then((users) => 
    {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(users);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
    Users.create(req.body)
    .then((users) => 
    {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(users);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.send('PUT operation not supported');
})
.delete((req,res,next) => {
    Users.deleteMany()
    .then((resp) => {
        res.statusCode = 200;
        res.contentType('Content-Type', 'application/json');
        res.send(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})

usersRouter.route('/:userId')
.get((req,res,next) => {
    Users.findById(req.params.userId)
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(user);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.send('Post operation isn\'t supported');
})
.put((req,res,next) => {
    Users.findByIdAndUpdate(req.params.userId, {$set: req.body}, {$new: true})
    .then((updatedUser) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(updatedUser);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req,res,next) => {
    Users.findByIdAndRemove(req.params.userId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})
module.exports = usersRouter;
