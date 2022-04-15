/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const admin = mongoose.model('admin');

/**
 * Expose
 */

module.exports = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    const options = {
      criteria: { email: email }
    };
    admin.load(options, function(err, user) {
      if (err) return done(err);
      if (!user) {
        return done(null, false, { message: 'Unknown user' });
      }
      if (!user.authenticate(password)) {
        return done(null, false, { message: 'Invalid password' });
      }
      return done(null, user);
    });
  }
);
