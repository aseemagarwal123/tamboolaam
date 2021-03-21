const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var sampleSchema = new mongoose.Schema({
  sample: {type:String}
});

sampleSchema.plugin(timestamps);
const sample = mongoose.model('samples', sampleSchema);
exports.sample = sample;