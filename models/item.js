const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
 
const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    category: {
        type: String,
        required:true
    },
    restaurant_id:{
        type: String,
        required:true
    },
    price: {
        type: Number,
        required:true
    }
});
itemSchema.plugin(timestamps);
exports.Item = mongoose.model('Item', itemSchema);