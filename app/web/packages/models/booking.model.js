'use strict';

const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    schema = mongoose.Schema;

module.exports = () => {
    const bookingsSchema = mongoose.Schema({
      date: {type: Number, default: 0},
      roomCount: {type: Number, default: 0},
      adultCount: {type: Number, default: 0},
      adultCountMore: {type: Boolean, default: false},
      childrenCount: {type: Number, default: 0},
      childrenCountMore: {type: Boolean, default: false},
      flyFrom: { type: schema.ObjectId, ref: 'flyFrom' },
      userId: { type: schema.ObjectId, ref: 'users' },
      packageId: { type: schema.ObjectId, ref: 'packages' },
      nightsStay: {type: Number, default: 0},
      name: {type: String, default: ''},
      email: {type: String, default: ''},
      phoneNumber: {type: String, default: ''},
      child1: {type: Number, default: 0},
      child2: {type: Number, default: 0}
    });

    bookingsSchema.plugin(mongoose_timestamps);
    return mongoose.model('bookings', bookingsSchema);
}

