const accountsController = require('../controller/accounts.controller'),
 	accountHelpers = require('../controller//helpers/accounts.helper'),
	accountsMiddleware = require('../middlewares/accounts.middleware'),
	passport = require('passport');

module.exports = (app, ver) => {
    app.post(
        ver + '/admin/login',
        accountsController.adminLogin
    );

    app.post(
        ver + '/admin/add/packages',
        // passport.isAuthenticated,
        accountsController.addPackages
    ); 

    app.post(
        ver + '/admin/edit/packages',
        // passport.isAuthenticated,
        accountsController.editPackages
    ); 
    
    app.get(
        ver + '/admin/packages',
        // passport.isAuthenticated,
        accountsController.getPackages
    );  

    app.get(
        ver + '/admin/package/:packageId',
        accountsController.fetchPackage
    );

    app.get(
        ver + '/admin/destinations',
        accountsController.fetchDestinations
    );

    app.post(
        ver + '/admin/add/visas',
        // passport.isAuthenticated,
        accountsController.addVisas
    ); 

    app.post(
        ver + '/admin/add/edit/destinations',
        // passport.isAuthenticated,
        accountsController.addEditDestinations
    ); 

    app.post(
        ver + '/admin/edit/configurations',
        // passport.isAuthenticated,
        accountsController.editConfigurations
    ); 

    app.get(
        ver + '/admin/fetch/visas/fields',
        // passport.isAuthenticated,
        accountsController.fetchVisasFields
    ); 

    app.post(
        ver + '/admin/edit/visas',
        // passport.isAuthenticated,
        accountsController.editVisas
    ); 
    
    app.get(
        ver + '/admin/visas',
        // passport.isAuthenticated,
        accountsController.getVisas
    );  

    app.get(
        ver + '/admin/visa/:visaId',
        accountsController.fetchVisa
    );

    app.post(
        ver + '/admin/add/blogs',
        // passport.isAuthenticated,
        accountsController.addBlogs
    ); 

    app.post(
        ver + '/admin/edit/blogs',
        // passport.isAuthenticated,
        accountsController.editBlogs
    ); 
    
    app.get(
        ver + '/admin/blogs',
        // passport.isAuthenticated,
        accountsController.getBlogs
    );  

    app.get(
        ver + '/admin/blog/:blogId',
        accountsController.fetchBlog
    );


    app.get(
        ver + '/admin/blog/:blogId',
        accountsController.fetchBlog
    ); 

    app.get(
        ver + '/admin/destination/:destinationId',
        accountsController.fetchDestination
    ); 
    
    app.get(
        ver + '/admin/list/packages/booking',
        accountsController.packagesBooking
    );
    
    app.get(
        ver + '/admin/packages/booking/:packageBookingId',
        accountsController.fetchPackageBooking
    );

    app.get(
        ver + '/admin/list/visas/booking',
        accountsController.visasBooking
    );
    
    app.get(
        ver + '/admin/visas/booking/:visasBookingId',
        accountsController.fetchVisaBooking
    );

    app.get(
        ver + '/admin/visas/languages/countaries',
        accountsController.fetchLanguagesCountaries
    );

    app.get(
        ver + '/subscriber/emails',
        accountsController.fetchSubscriberEmails
    );

    app.get(
        ver + '/configurations',
        accountsController.fetchConfigurations
    );

    app.get(
        ver + '/contact/us/data',
        accountsController.fetchContactUs
    );
};