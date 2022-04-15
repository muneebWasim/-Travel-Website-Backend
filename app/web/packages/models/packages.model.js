
'use strict';

const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    schema = mongoose.Schema;

let daysPlan = {
      day: { type: Number, default: 0 },
      description: { type: String, default: '' },
      image: { type: String, default: '' }
    };

module.exports = () => {
    const packagesSchema = mongoose.Schema({
      image: {type: String, default: ''},
      name: {type: String, default: ''},
      daysPlan: { type: [daysPlan], default: [] },
      contactNumber: {type: String, default: ''},
      contactPrefix: {type: String, default: ''},
      durationOfStay: {type: Number, default: 0},
      minimumAge: {type: Number, default: 0},
      availability: {type: Number, default: 0},
      packageStartingDate: {type: Number, default: 0},
      departure: {type: String, default: ''},
      departureTime: {type: Number, default: 0},
      departurePlaceTime: {type: Number, default: 0},
      returnTime: {type: Number, default: 0},
      included: { type: [], default: [] },
      notIncluded: { type: [], default: [] },
      description: {type: String, default: ''},
      destinationId: { type: schema.ObjectId, ref: 'destinations' },
      price: {type: Number, default: 0},
      status: {type: Number, default: 1}, //0 => disabled, 1 => enabled
      discountedPrice: {type: Number, default: 0},
      homePage: {type: Boolean, default: false},
      flights: {type: Boolean, default: true},
      hotels: {type: Boolean, default: true},
      transfers: {type: Boolean, default: true},
      sightSeeing: {type: Boolean, default: true}
    });

    packagesSchema.plugin(mongoose_timestamps);
    packagesSchema.index({name: 1});

    return mongoose.model('packages', packagesSchema);
}

