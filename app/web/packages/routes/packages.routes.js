const packagesController = require('../controller/packages.controller'),
 	packagesHelpers = require('../controller//helpers/packages.helper'),
	packagessMiddleware = require('../middlewares/packages.middleware'),
	passport = require('passport');

module.exports = (app, ver) => {
    app.get(
        ver + '/packages',
        packagesController.fetchPackages
    );

    app.get(
        ver + '/package/:packageId',
        packagesController.fetchPackage
    );

    app.get(
        ver + '/packages/destinations/names',
        packagesController.fetchPackagesDestinations
    );

    app.get(
        ver + '/destinations',
        packagesController.fetchDestinations
    );

    app.get(
        ver + '/flyFrom',
        packagesController.fetchFlyFrom
    );

    app.get(
        ver + '/discount/offers',
        packagesController.fetchOffers
    );

    app.get(
        ver + '/articles/tips',
        packagesController.fetchArticles
    );

    app.get(
        ver + '/home/screen',
        packagesController.fetchHomeScreen
    );  

    app.post(
        ver + '/add/booking',
        packagesController.addBooking
    );  
};