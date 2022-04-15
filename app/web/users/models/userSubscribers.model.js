
'use strict';

const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    schema = mongoose.Schema;

module.exports = () => {
    const userSubscribersSchema = mongoose.Schema({
      email: {type: String, default: ''},
      status: {type: Number, default: 1}, //0 => disabled, 1 => enabled
    });
    userSubscribersSchema.plugin(mongoose_timestamps);
    userSubscribersSchema.index({name: 1});

    return mongoose.model('userSubscribers', userSubscribersSchema);
}

