'use strict';

const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    schema = mongoose.Schema;

module.exports = () => {
    const visaLanguagesSchema = mongoose.Schema({
      name: {type: String, default: ''},
      status: {type: Number, default: 1} //0 => disabled, 1 => enabled
    });

    visaLanguagesSchema.plugin(mongoose_timestamps);
    visaLanguagesSchema.index({name: 1});

    return mongoose.model('visaLanguages', visaLanguagesSchema);
}

