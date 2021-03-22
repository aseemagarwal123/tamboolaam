const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [validateEmail, 'Please enter a valid email address']
    },
    password:{
        type: String,
        required: true
    },
    phone: {
        type: Number,
    },
    // roles: {
    //     type: [String],
    //     default: ['admin', 'manager', 'driver', 'client'] 
    // },
    user_type: {
        type: String,
        required: true
    }
});

userSchema.plugin(timestamps);
module.exports = mongoose.model('User', userSchema);