const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leadersSchema = new Schema ({
    name : 
    {
        type: String
    },
    image: {
        data: Buffer,
        contentType: String
    },
    designation: {
        type: String,
    },
    abbr: {
        type: String,
    },
    description: {
        type: String,
    },
    featured: {
        type: Boolean,
    }
})

var Leaders = mongoose.model('Leader', leadersSchema);
module.exports = Leaders;