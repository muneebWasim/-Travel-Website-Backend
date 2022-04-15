const { Console } = require('winston/lib/winston/transports');

const passport = require('passport'),
    mongoose = require('mongoose'),
    userSubscribersModel =  mongoose.model('userSubscribers'),
    configurationModel =  mongoose.model('configuration'),
    contactUsModel =  mongoose.model('contactUs'),
    userModel = mongoose.model('users'),
    response = require('../../../../config/response'),
    visasModel = mongoose.model('visas');

let loginFacebook = async (req, res, next) => {
    try{
        passport.authenticate('facebook-token', (err, user) => {
            if ( err ) {
                return next({ msgCode: 1 })
            } else if ( user.isNewUser ) {
                response.success(res, {
                    data: {}
                })
            } else {
                req.logIn(user, (err) => {
                    if ( err ) {
                        return next({ msgCode: 1 })
                    }
                    response.success(res, {
                        data: {}
                    })
                });
            }
        })(req, res, next);
        
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};


let loginGoogle = async (req, res, next) => {
    try{

        let googleId = req.body.googleId,
            email = req.body.email,
            familyName = req.body.familyName,
            givenName = req.body.givenName,
            imageUrl = req.body.imageUrl,
            access_token = req.body.access_token;

            let user = await userModel.findOne({ signInType: 0, googleId, email });

            if(user){
                req.logIn(user, (err) => {
                    if (err) {
                        console.log(err)

                        return next({ msgCode: 1 });
                    }
                    response.success(res, {
                        data: {}
                    })                });
            } else {
                user = await new userModel({
                    firstName: givenName,
                    lastName: familyName,
                    email,
                    status: 1,
                    signInType: 0,
                    googleId,
                    googleToken: access_token,
                    image: imageUrl
                }).save();
                req.logIn(user, (err) => {
                    if (err) {
                        console.log(err)
                        return next({ msgCode: 1 });
                    }
                    return next();
                }); 
                response.success(res, {
                    data: {}
                })       
            }

    } catch(err){

        return next({ msgCode: 1 })
    }
};

let addSubscribers = async (req, res, next) => {
    try{
        let email = req.body.email || '',
            emailExist = await userSubscribersModel.count({ email });

        if(emailExist){
            return next({ msgCode: 5 })
        }

        new userSubscribersModel({
            email,
            status: 1
        }).save();

        response.success(res, {
            data: {}
        })
        
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};

let fetchFooter = async (req, res, next) => {
    try{
        let footer = await configurationModel.findOne({},{
                facebookLink: 1,
                twitterLink: 1,
                instagramLink: 1,
                footerHeader: 1,
                footerDescription: 1
            });

        response.success(res, {
            data: footer
        })
        
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};



let contactUs = async (req, res, next) => {
    try{
        let name = req.body.name || '',
            phoneNumber = req.body.phoneNumber || '',
            numberOfPersons = req.body.numberOfPersons || '',
            packageId = req.body.packageId || '',
            email = req.body.email || '';
          
        new contactUsModel({
            name,
            phoneNumber,
            numberOfPersons,
            packageId,
            email,
            status: 1
        }).save();

        response.success(res, {
            data: {}
        })
        
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};

module.exports = {
    loginFacebook,
    loginGoogle,
    addSubscribers,
    contactUs,
    fetchFooter
};