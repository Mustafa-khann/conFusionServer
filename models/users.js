const mongoose = require('mongoose');
const Schema =mongoose.Schema;



const usersSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    image:
    {
        type: String,
        required: true
    },
    designation:
    {
        type: String,
        required: true
    },
    abbr: 
    {
        type: String,
        required: true
    },
    description: 
    {
        type: String,
        required: true
    },
    featured:
    {
        type: Boolean,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('usersSchema', usersSchema);