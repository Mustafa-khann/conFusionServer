const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json)

dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the dishes!');
})
.post((req,res,next) => {
    res.end('Will add the promotion : ' + req.body.params);
})
.put((req,res,next) => {
    res.end('Put operations is not supported');
})
.delete((req,res,next) => {
    res.end('Will Delele all the dishes');
})

dishRouter.route('/:dishId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send the dish : '  + req.params.dishId);
})
.post((req,res,next) => {
    res.end('Will add the dish as : '  + req.params.dishId + 'with name : ' + req.body.name + ' and details : ' + req.body.discription);
})
.put((req,res,next) => {
    res.end('PUT operations not supported on this route');
})
.delete((req,res,next) => {
    res.end('Will delete the dish : '  + req.params.dishId);
})

module.exports = dishRouter