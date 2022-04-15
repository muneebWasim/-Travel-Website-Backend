const flightsController = require('../controller/flights.controller'),
 	flightsHelpers = require('../controller//helpers/flights.helper'),
	flightssMiddleware = require('../middlewares/flights.middleware'),
	passport = require('passport');

module.exports = (app, ver) => {
    app.get(
        ver + '/flights/flying/from',
        flightsController.fetchflightsFlyingFrom
    );


    // app.get(
    //     ver + '/package/:packageId',
    //     flightsController.fetchPackage
    // );

    app.get(
        ver + '/flights/destinations/names',
        flightsController.fetchflightsDestinations
    );

    app.get(
        ver + '/destinations',
        flightsController.fetchDestinations
    );

    app.get(
        ver + '/discount/offers',
        flightsController.fetchOffers
    );

    app.get(
        ver + '/articles/tips',
        flightsController.fetchArticles
    );

    app.get(
        ver + 'flight/home/screen',
        flightsController.fetchHomeScreen
    ); 

    app.get(
        ver + '/city/to/iata/:city',
        flightsController.cityToIata
    );  
    
    app.post(
        ver + '/flight/travelport',
        flightsController.getFlightsData
    );  
};