'use strict';

const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    bcrypt = require('bcryptjs'),
    saltFactor = 12;

module.exports = () => {
    const adminSchema = mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      profileImage: { type: String, default: '' },
      phoneNumber: { type: String, default: '' },
      phoneNumberPrefix: { type: String, default: '' },
      accountType: { type: Number, default: 3 }, 
      sessionId: { type: String, default: '' }
    });

    adminSchema.plugin(mongoose_timestamps);

    adminSchema.pre('save', function(next) {
        bcrypt.genSalt(saltFactor, (err, salt) => {
            if (err) return next(err);
    
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) return next(err);
    
                this.password = hash;
                next();
            });
        });
    });
    
    adminSchema.methods.comparePassword = function(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
            if (err) {
                return cb(err);
            }
            cb(null, isMatch);
        });
    };
    return mongoose.model('admin', adminSchema);
}