
'use strict';

const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    schema = mongoose.Schema;

module.exports = () => {
    const contactUsSchema = mongoose.Schema({
      name: {type: String, default: ''},
      phoneNumber: {type: String, default: ''},
      numberOfPersons: {type: Number, default: 0},
      packageId: { type: schema.ObjectId, ref: 'packages' },
      email: {type: String, default: ''},
      status: {type: Number, default: 1}, //0 => disabled, 1 => enabled
    });
    contactUsSchema.plugin(mongoose_timestamps);
    contactUsSchema.index({name: 1});

    return mongoose.model('contactUs', contactUsSchema);
}

