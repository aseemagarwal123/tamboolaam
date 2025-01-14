const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const userSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    validate: [validateEmail, 'Please enter a valid email address']
  },
  password: {
    type: String
  },
  phone: {
    type: Number,
    require: true,
    unique: true
  },
  user_type: {
    type: String,
    required: true
  },
  addresses: [{
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
    src: {
      type: String
    }
  }],
  is_online: {
    type: String,
    default: true
  }
});

userSchema.plugin(timestamps);
exports.User = mongoose.model('User', userSchema);