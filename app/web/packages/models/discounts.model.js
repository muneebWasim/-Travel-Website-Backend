
'use strict';

const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    schema = mongoose.Schema;

module.exports = () => {
    const discountsSchema = mongoose.Schema({
      image: {type: String, default: ''},
      name: {type: String, default: ''},
      price: {type: Number, default: 0},
      status: {type: Number, default: 1}, //0 => disabled, 1 => enabled
      discountedPrice: {type: Number, default: 0},
      homePage: {type: Boolean, default: false},
      bannerDiscount: {type: Boolean, default: false},
      description1: {type: String, default: ''},
      description2: {type: String, default: ''}
   });

    discountsSchema.plugin(mongoose_timestamps);
    discountsSchema.index({name: 1});

    return mongoose.model('discounts', discountsSchema);
}

