
'use strict';

const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    schema = mongoose.Schema;

module.exports = () => {
    const flightLocationsSchema = mongoose.Schema({

      code: {type: String, default: ''},
      name: {type: String, default: ''},
      country: {type: String, default: ''},
      status: {type: Number, default: 1} //0 => disabled, 1 => enabled
    });

    flightLocationsSchema.plugin(mongoose_timestamps);
    flightLocationsSchema.index({name: 1});

    return mongoose.model('flightLocations', flightLocationsSchema);
}

