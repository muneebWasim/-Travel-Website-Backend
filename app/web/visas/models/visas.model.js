
'use strict';

const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    schema = mongoose.Schema;

let visasPricingObj = {
  price: {type: Number, default: 0},
  name: {type: String, default: ''},
  services: []
};

module.exports = () => {
    const visasSchema = mongoose.Schema({
      name: {type: String, default: ''},
      image: {type: String, default: ''},
      status: {type: Number, default: 1}, //0 => disabled, 1 => enabled
      currencyId: { type: schema.ObjectId, ref: 'visaCurrencies' },
      languagesId: { type: schema.ObjectId, ref: 'visaLanguages' },
      countryId: { type: schema.ObjectId, ref: 'visaCountaries' },
      heading: {type: String, default: ''},
      documentsRequired: {type: String, default: ''},
      description: {type: String, default: ''},
      validity: {type: Number, default: 0},// days
      visaType: {type: Number, default: 1}, //0 => visa assistance, 1 => 
      entryType: {type: Number, default: 1}, //0 => visa assistance, 1 => 
      processingTime: {type: Number, default: 0}, //working days
      visasPricing: [visasPricingObj]
    });

    visasSchema.plugin(mongoose_timestamps);
    visasSchema.index({name: 1});

    return mongoose.model('visas', visasSchema);
}

