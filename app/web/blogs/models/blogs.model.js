
'use strict';

const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    schema = mongoose.Schema;

module.exports = () => {
    const blogsSchema = mongoose.Schema({
      blogPic: {type: String, default: ''},
      blogDate: {type: Number, default: ''},
      blogCommentCount: {type: String, default: ''},
      blogTitle: {type: String, default: ''},
      status: {type: Number, default: 1}, //0 => disabled, 1 => enabled
      blogsType: {type: Number, default: 1}, //0 => simple blogs, 1 => travel tips
      completeBlog: {type: String, default: ''},
      blogSmallDesription: {type: String, default: ''}
    });

    blogsSchema.plugin(mongoose_timestamps);
    blogsSchema.index({name: 1});

    return mongoose.model('blogs', blogsSchema);
}

