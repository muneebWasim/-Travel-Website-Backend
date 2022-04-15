
'use strict';

const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    schema = mongoose.Schema;

module.exports = () => {
    const destinationsSchema = mongoose.Schema({
      image: {type: String, default: ''},
      name: {type: String, default: ''},
      status: {type: Number, default: 1}, //0 => disabled, 1 => enabled
      homePage: {type: Boolean, default: false}
    });

    destinationsSchema.plugin(mongoose_timestamps);
    destinationsSchema.index({name: 1});

    return mongoose.model('destinations', destinationsSchema);
}

