
'use strict';

const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    schema = mongoose.Schema;

module.exports = () => {
    const usersSchema = mongoose.Schema({
      firstName: {type: String, default: ''},
      lastName: {type: String, default: ''},
      email: {type: String, default: ''},
      status: {type: Number, default: 1}, //0 => disabled, 1 => enabled
      signInType: {type: Number, default: 0}, //0 => google, 1 => facebook 
      googleId: {type: String, default: ''},
      googleToken: {type: String, default: ''},
      image: {type: String, default: ''},
      facebookId: {type: String, default: ''},
      facebookToken: {type: String, default: ''}
    });
    usersSchema.plugin(mongoose_timestamps);
    usersSchema.index({name: 1});

    return mongoose.model('users', usersSchema);
}

