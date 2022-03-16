const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

// Comment Schema
const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
});
// Dish Schema
const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
    }, 
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: String,
        required: true
    },
    comments: {
        type: [commentSchema],
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});


var Dishes = mongoose.model('Dish', dishSchema);
module.exports = Dishes;
