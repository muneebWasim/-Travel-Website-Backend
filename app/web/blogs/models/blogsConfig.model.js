'use strict';

const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    schema = mongoose.Schema;

module.exports = () => {
    const blogsConfigSchema = mongoose.Schema({
      blogTopLine1: {type: String, default: ''},
      blogTopLine2: {type: String, default: ''},
      blogPic: {type: String, default: ''},
    });

    blogsConfigSchema.plugin(mongoose_timestamps);
    blogsConfigSchema.index({name: 1});

    return mongoose.model('blogsConfig', blogsConfigSchema);
}

