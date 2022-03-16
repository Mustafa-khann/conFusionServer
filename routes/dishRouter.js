const express = require('express');
const bodyParser = require('body-parser');

const Dishes = require('../models/dishes');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json())

dishRouter.route('/')
.get((req,res,next) => {
    Dishes.find({})
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
    Dishes.create(req.body.params)
    .then((dish) => {
        console.log("Dish Created " + dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req,res,next) => {
    res.end('Put operations are not supported');
})
.delete((req,res,next) => {
    Dishes.remove({})
    .then((resp)=> {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})

dishRouter.route('/:dishId')
.get((req,res,next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId);
})
.put((req,res,next) => {
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, { new: true})
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req,res,next) => {
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})

// comments

dishRouter.route('/:dishId/comments')
.get((req,res,next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if(dish != null)
        {
            res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish.comments);
        }
        else
        {
            err = new Error('Dish ' + req.params.dishId + ' not Found!');
            err.statusCode = 404;
            return next(err);
        }
        
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
    Dishes.findById(req.body.dishId)
    .then((dish) => {
        if(dish != null)
        {
            dish.comments.push(req.body);
            dish.save()
            .then((dish) => {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json'); 
                  res.json(dish); 
            })
        }
        else
        {
            err = new Error('Dish ' + req.params.dishId + ' not Found!');
            err.statusCode = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req,res,next) => {
    res.end('Put operations are not supported on ' + req.params.dishId + '/comments');
})
.delete((req,res,next) => {
    Dishes.findById(req.params.dis)
    .then((dish)=> {
        if(dish != null)
        {
           for(var i = (dish.comments.length - 1); i<=0; i--)
           {
               dish.comments.id(dish.comments[i]._id).remove();
           }
           dish.save()
           .then((dish) =>{
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json(dish);
           }) 
        }
        else
        {
            err = new Error('Dish ' + req.params.dishId + ' not Found!');
            err.statusCode = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})

dishRouter.route('/:dishId/comments/:commentId')
.get((req,res,next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if(dish != null && dish.comments.id(req.params.commentId) != null)
        {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments.id(req.params.commentId));
        }
        else if(dish == null)
        {
            err = new Error('Dish ' + req.params.dishId + ' not Found!');
            err.statusCode = 404;
            return next(err);
        }
        
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId);
})
.put((req,res,next) => {
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, { new: true})
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req,res,next) => {
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((dish) => {
        if(dish != null)
        {
            for(var i=dish.comments.length - 1; i>=0; i--)
            {
                dish.comments.id(dish.comments[i]._id).remove();
            }
        }
        else{
            res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
        }
        
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = dishRouter