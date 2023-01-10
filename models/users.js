const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const usersSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        unique: true,
        required: true,
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('usersSchema', usersSchema);