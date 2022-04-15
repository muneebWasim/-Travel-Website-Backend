'use strict';

const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    schema = mongoose.Schema;

module.exports = () => {
    const visaCountariesSchema = mongoose.Schema({
      name: {type: String, default: ''}, 
      code: {type: String, default: ''}, 
      continent: {type: Number, default: 0},// 1 => America 2=> Russia 3=> Europe 4=> Africa 5=> Middle East 6=> Asia 7=> Australia
      status: {type: Number, default: 1}, //0 => disabled, 1 => enabled
    });

    visaCountariesSchema.plugin(mongoose_timestamps);
    visaCountariesSchema.index({name: 1});

    return mongoose.model('visaCountaries', visaCountariesSchema);
}

