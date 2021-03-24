const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
 
const restaurantSchema = mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    category: {
        type: String,
        required:true
    },
    address: {
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
        }
    },
    staff:[{
        user_id:{type:String},
        role:{type:String}
    }]

});
restaurantSchema.plugin(timestamps);
exports.Restaurant = mongoose.model('Restaurant', restaurantSchema);