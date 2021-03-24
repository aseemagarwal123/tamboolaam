const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

const orderSchema = mongoose.Schema({
    items:[{
    name: {
        type: String,
        required:true
    },
    category: {
        type: String,
        required:true
    },
    item_id:{
        type: String,
        required:true
    },
    price: {
        type: Number,
        required:true
    }
    }],
    order_id:{
        type:String
    },
    driver_id:{
        type:String
    },
    restaurant_id:{
        type:String
    },
    sub_total:{
        type:Number
    },
    final_total:{
        type:Number
    },
    delivery_address: {
    line1: {
        type: String
    },
    line2: {
        type: String
    },
    line3: {
        type: String
    },
    lat: {
        type: String
    },
    long: {
        type: String
    },
    order_type:{type: String},
    delivery_type:{type: String},
    status:{type: String}
}
    
});

orderSchema.plugin(timestamps);
exports.Order = mongoose.model('Order', orderSchema);