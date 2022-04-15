'use strict';

const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    bcrypt = require('bcryptjs'),
    saltFactor = 12;

module.exports = () => {
    const configurationSchema = mongoose.Schema({
      facebookLink: { type: String, default: '' },
      twitterLink: { type: String, default: '' },
      instagramLink: { type: String, default: '' },
      footerHeader: { type: String, default: '' },
      footerDescription: { type: String, default: '' }
    });

    configurationSchema.plugin(mongoose_timestamps);

    return mongoose.model('configuration', configurationSchema);
}