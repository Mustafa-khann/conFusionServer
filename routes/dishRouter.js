const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const bodyParser = require('body-parser');

const dishRouter = express.Router();
const Dishes = require('../models/dishes');

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.get((req,res,next) => {
     Dishes.find({})
     .then((dishes) => {
        res.statusCode = 200;
        res.contentType("Content-Type", "application/json");
        res.json(dishes);
     }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
      Dishes.create(req.body)
      .then((dish) => {
         res.statusCode = 200;
         res.contentType('Content-type', 'application/json');
         res.json(dish);
      }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req,res,next) => {
   res.statusCode = 403;
   res.send('PUT operation isn\'t supported');
})
.delete((req,res,next) => {
   Dishes.remove({})
   .then((resp) => {
      res.statusCode = 200;
      res.contentType('Content-type', 'application/json');
      res.json(resp);
   }, (err) => next(err))
    .catch((err) => next(err));
})

dishRouter.route('/:dishId')
.get((req,res,next) => {
   Dishes.findById(req.params.dishId)
   .then((dish) => {
      res.statusCode = 200;
      res.contentType('Content-type', 'application/json');
      res.json(dish);
   }, (err) => next(err))
   .catch((err) => next(err));
})
.post((req,res,next) => {
   res.statusCode = 403;
   res.send('POST operations isn\'t supported on this endpoint');
})
.put((req,res,next) => {
   Dishes.findByIdAndUpdate(req.params.dishId, {$set: req.body}, {new: true})
   .then((updatedDish) => {
      res.statusCode = 200;
      res.contentType('Content-type', 'application/json');
      res.json(updatedDish);
   }, (err) => next(err))
   .catch((err) => next(err));
})
.delete((req,res,next) => {
   Dishes.findByIdAndRemove(req.params.dishId)
   .then((resp) => {
      res.statusCode = 200;
      res.contentType('Content-type', 'application/json');
      res.json(resp);
   }, (err) => next(err))
   .catch((err) => next(err));
})

module.exports = dishRouter;