
'use strict';

const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    schema = mongoose.Schema;

module.exports = () => {
    const flyFromSchema = mongoose.Schema({
      name: {type: String, default: ''},
      status: {type: Number, default: 1}, //0 => disabled, 1 => enabled
      
    });

    flyFromSchema.plugin(mongoose_timestamps);
    flyFromSchema.index({name: 1});

    return mongoose.model('flyFrom', flyFromSchema);
}

