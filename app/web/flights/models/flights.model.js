'use strict';

const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    schema = mongoose.Schema;

module.exports = () => {
    const flightsSchema = mongoose.Schema({
      tripType: {type: Number, default: 0},  //1=> round trip 2=> one way 3=> multicity
      flyingFromId: { type: schema.ObjectId, ref: 'flightLocations' },
      flyingToId: { type: schema.ObjectId, ref: 'flightLocations' },
      departureDate: {type: Number, default: 0},
      returningDate: {type: Number, default: 0},
      adults: {type: Number, default: 0},
      numberOfStops: {type: Number, default: 0},
      price: {type: Number, default: 0},
      timeOfFlight: {type: Number, default: 0},
      weightOfBaggage: {type: Number, default: 0},
      airlineId: { type: schema.ObjectId, ref: 'airlines' },
      children: {type: Number, default: 0},  //age 2-11
      infant: {type: Number, default: 0}, //age 0-2
      countBooked: {type: Number, default: 0},
      status: {type: Number, default: 1}, //0 => disabled, 1 => enabled
    });

    flightsSchema.plugin(mongoose_timestamps);
    flightsSchema.index({name: 1});

    return mongoose.model('flights', flightsSchema);
}

