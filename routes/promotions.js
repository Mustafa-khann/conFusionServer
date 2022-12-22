const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const promotionRouter = express.Router();
const Promotions = require('../models/promotions');

promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
.get((req,res,next) => {
     Promotions.find({})
     .then((promotions) => {
        res.statusCode = 200;
        res.contentType("Content-Type", "application/json");
        res.json(promotions);
     }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
      Promotions.create(req.body)
      .then((promotions) => {
         res.statusCode = 200;
         res.contentType('Content-type', 'application/json');
         res.json(promotions);
      }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req,res,next) => {
   res.statusCode = 403;
   res.send('PUT operation isn\'t supported');
})
.delete((req,res,next) => {
   Promotions.deleteMany({})
   .then((resp) => {
      res.statusCode = 200;
      res.contentType('Content-type', 'application/json');
      res.json(resp);
   }, (err) => next(err))
    .catch((err) => next(err));
})

promotionRouter.route('/:promotionId')
.get((req,res,next) => {
   Promotions.findById(req.params.promotionId)
   .then((promotion) => {
      res.statusCode = 200;
      res.contentType('Content-type', 'application/json');
      res.json(promotion);
   }, (err) => next(err))
   .catch((err) => next(err));
})
.post((req,res,next) => {
   res.statusCode = 403;
   res.send('POST operations isn\'t supported on this endpoint');
})
.put((req,res,next) => {
   Promotions.findByIdAndUpdate(req.params.promotionId, {$set: req.body}, {new: true})
   .then((updatedPromotion) => {
      res.statusCode = 200;
      res.contentType('Content-type', 'application/json');
      res.json(updatedPromotion);
   }, (err) => next(err))
   .catch((err) => next(err));
})
.delete((req,res,next) => {
   Promotions.findByIdAndRemove(req.params.promotionId)
   .then((resp) => {
      res.statusCode = 200;
      res.contentType('Content-type', 'application/json');
      res.json(resp);
   }, (err) => next(err))
   .catch((err) => next(err));
})

module.exports = promotionRouter;