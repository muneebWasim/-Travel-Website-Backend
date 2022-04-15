const usersController = require('../controller/users.controller'),
 	usersHelpers = require('../controller//helpers/users.helper'),
	userssMiddleware = require('../middlewares/users.middleware'),
	passport = require('passport');

module.exports = (app, ver) => {

    app.post(
        ver + '/login/facebook',
        usersController.loginFacebook
    );

    app.post(
        ver + '/login/google',
        usersController.loginGoogle
    );

    app.post(
        ver + '/add/subscribers',
        usersController.addSubscribers
    );

    app.post(
        ver + '/contact/us',
        usersController.contactUs
    );

    app.get(
        ver + '/footer',
        usersController.fetchFooter
    );

    // app.get(
    //     ver + '/visa/details/:countryId',
    //     usersController.fetchusersDetails
    // );
};