
'use strict';

const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    schema = mongoose.Schema;

module.exports = () => {
    const articlesSchema = mongoose.Schema({
      image: {type: String, default: ''},
      name: {type: String, default: ''}, 
      date: {type: Number, default: 0},
      description: {type: String, default: ''},
      status: {type: Number, default: 1}, //0 => disabled, 1 => enabled
      homePage: {type: Boolean, default: false}
    });

    articlesSchema.plugin(mongoose_timestamps);
    articlesSchema.index({name: 1});

    return mongoose.model('articles', articlesSchema);
}

