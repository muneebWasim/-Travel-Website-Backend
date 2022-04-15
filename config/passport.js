'use strict';

/*
 * Module dependencies.
 */

const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const passport = require('passport');
const GoogleTokenStrategy = require('passport-google-token').Strategy;	
const userModel = mongoose.model('users');
const admin = mongoose.model('admin');

 
 passport.use(new GoogleTokenStrategy({
  clientID: "",
  clientSecret: "",
  profileFields: [ 'emails', 'name', 'id' ],
  passReqToCallback: true
  
}, async (req, token, refreshToken, profile, done) => {


  try {
  if( !profile || !profile.id ){
    return done({ msgCode: 1 });
  }

  let email = profile.emails[ 0 ].value.toLowerCase(),
      userDetails = null,
      account = { googleToken: token };

    if(email === ''){
      email = null;
    }

     let user = await userModel.findOne({ googleId: profile.id }),
        isEmailExist = null;

     if(user){
       userDetails = await userModel.findOneAndUpdate({ _id: user._id }, { $set: account }, { new: true });

       if(!userDetails){

      return done({ msgCode: 1013 });
      }
     } else {
       if(email){
         isEmailExist = await userModel.findOne({ email }, { googleId: 1, isGoogleAccount: 1 }).lean();
       }

       if(!isEmailExist){
         Object.assign(account, {
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            isGoogleAccount: true,
            email: email || ''
         });
         userDetails = await new userModel( account ).save();

          if(!userDetails){

            return done({ msgCode: 1 });
          }
       } else {
         if(isEmailExist.isGoogleAccount){
           if(isEmailExist.googleId !== profile.id){
             return done({ msgCode: 1 });
           }
         } else {
           Object.assign(account, {
              googleId: profile.id,
              isGoogleAccount: true
           });
           userDetails = await userModel.findOneAndUpdate({ _id: isEmailExist._id }, { $set: account }, { new: true });

           if(!userDetails){

            return done({ msgCode: 1 });
          }
         }
       }
     }
     return done(null, userDetails);
   } catch(err){
    console.log(err)

    return done({ msgCode: 1 });
   }
}));
 

 passport.use(new FacebookTokenStrategy({
    clientID: "",
    clientSecret: "",
    profileFields: [ 'emails', 'name', 'id', 'photos' ], 
    passReqToCallback: true}, 
    async (req, token, refreshToken, profile, done) => {
      if ( !profile.id ) {
        return done({ msgCode: 1 });
      } else {
        let user = await userModel.findOne({ facebookId: profile.id }).lean();
        if ( user ) {
            return done(null, user);
        } else {
          if ( !profile.emails[ 0 ].value ) {
            profile.emails[ 0 ].value = '';
          }
          let newUserObj = {
                  firstName: profile.name.givenName,
                  lastName: profile.name.familyName,
                  email: profile.emails[ 0 ].value,
                  facebookId: profile.id,
                  facebookToken: token,
              },
              userAccount = new userModel(newUserObj).save(),
              updatedUser = await userAccount.findOne(filter).lean();
              if ( updatedUser ) {
                  updatedUser.isNewUser = true;
                  return done(null, updatedUser);
              }
          }
        }
      }
  ));

// serialize and deserialize sessions
  
  passport.use('Admin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(username, password, done) {
  admin.findOne({ email: username }, (err, acct) => {
    if (err) {
      return done(err);
        }
        if (!acct) {
          return done(null, false, { msgCode: 4 });
        }
        if( acct.userType === 'SubAdmin' && !acct.status){
          return done({ msgCode: '0005'});
        }
        acct.comparePassword(password, (err, isMatch) => {
          if (err) {
                return done(err);
              }
              if (!isMatch) {
                return done(null, false, { msgCode: 3 });
              }
              return done(null, acct);
            });
          });
        }));

        passport.serializeUser((user, done) => {
          console.log('sdasdasdasdasdasdasd')

          console.log(user)
          console.log(user._id)

          done(null, user._id);
      });
      
      passport.deserializeUser((_id, done) => {
          userModel.findOne({_id})
              .exec((err, userModel) => {
                  if ( userModel ) {
                      done(err, userModel);
                  } else {
                    admin.findById(_id, function (err, adminAccount) {
                          if ( adminAccount ) {
                              done(err, adminAccount);
                          }
                          else {
                              done(err, false);
                          }
                      });
                  }
              });
      
      });
        
        // passport.serializeUser((user, done) => done(null, user.id));
        // passport.deserializeUser((id, done) => admin.findOne({ _id: id }, done));



        passport.isAuthenticated = (req, res, next) => {
          if (req.isAuthenticated()) {
              return next();
          } 
          return next({ msgCode: '2' });
      };
        // use these strategies
        // passport.use(admin);
        module.exports = passport;
        