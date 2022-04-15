
'use strict';

const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    schema = mongoose.Schema;

module.exports = () => {
    const airlinesSchema = mongoose.Schema({
      name: {type: String, default: ''},
      status: {type: Number, default: 1} //0 => disabled, 1 => enabled
    });

    airlinesSchema.plugin(mongoose_timestamps);
    airlinesSchema.index({name: 1});

    return mongoose.model('airlines', airlinesSchema);
}

