'use strict';

const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    schema = mongoose.Schema;

module.exports = () => {
    const visaCurrenciesSchema = mongoose.Schema({
      name: {type: String, default: ''}, 
      status: {type: Number, default: 1}, //0 => disabled, 1 => enabled
    });

    visaCurrenciesSchema.plugin(mongoose_timestamps);
    visaCurrenciesSchema.index({name: 1});

    return mongoose.model('visaCurrencies', visaCurrenciesSchema);
}

