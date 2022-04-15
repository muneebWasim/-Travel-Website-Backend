'use strict';

const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    schema = mongoose.Schema;


let adult = {
      title: {type: String, default: ''}, 
      firstName: {type: String, default: ''}, 
      lastName: {type: String, default: ''}, 
      passportNumber: {type: String, default: 0}, 
      dob: {type: Number, default: 0}
    }, 
    children = {
      title: {type: String, default: ''}, 
      firstName: {type: String, default: ''}, 
      lastName: {type: String, default: ''}, 
      passportNumber: {type: String, default: 0}, 
      dob: {type: Number, default: 0}
    };
module.exports = () => {
    const visaBookingsSchema = mongoose.Schema({
      name: {type: String, default: ''}, 
      userId: { type: schema.ObjectId, ref: 'users' },
      visaApplicantsCount: {type: Number, default: 0},
      date: {type: Number, default: 0},
      adult: [ adult ],
      children: [ children ],
      phoneNumber: {type: String, default: ''}, 
      address: {type: String, default: ''}, 
      email: {type: String, default: ''}, 
      visaId: { type: schema.ObjectId, ref: 'visas' },
      visaTypeId: { type: schema.ObjectId },
      promoCodeApplied: {type: Boolean, default: false}, 
      sendDealsByEmail: {type: Boolean, default: false}, 
      businessGST: {type: Boolean, default: false}, 
      promoCode: {type: String, default: ''}, 
      promoCodeDiscount: {type: Number, default: 0}, 
      status: {type: Number, default: 1} //0 => disabled, 1 => enabled
    });

    visaBookingsSchema.plugin(mongoose_timestamps);
    visaBookingsSchema.index({name: 1});

    return mongoose.model('visaBookings', visaBookingsSchema);
}

