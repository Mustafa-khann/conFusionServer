const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const promotionsSchema = new Schema ({
    name : 
    {
        type : String,
        required: true,
    },
    image:{
        data: Buffer,
        contentType: String
    },
    label:
    {
        type: String,
    },
    price: {
        type: Currency,
    },
    description : 
    {
        type : String,
    },
    featured: 
    {
        type: Boolean,
    }
})

var Promotions = mongoose.model('Promotions', promotionsSchema);
module.exports = Promotions;