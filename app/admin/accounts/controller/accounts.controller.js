const passport = require('passport'),
    mongoose = require('mongoose'),
    response = require('../../../../config/response'),
    packagesModel = mongoose.model('packages'),
    destinationsModel = mongoose.model('destinations'),
    visasModel = mongoose.model('visas'),
    blogsModel = mongoose.model('blogs'),
    bookingsModel = mongoose.model('bookings'),
    contactUsModel =  mongoose.model('contactUs'),
    configurationModel =  mongoose.model('configuration'),
    userSubscribersModel =  mongoose.model('userSubscribers'),
    visaLanguagesModel = mongoose.model('visaLanguages'),
    visaCurrenciesModel = mongoose.model('visaCurrencies'),
    visaCountariesModel = mongoose.model('visaCountaries'),
    visaBookingsModel = mongoose.model('visaBookings'),
    accountHelpers = require('./helpers/accounts.helper');

let adminLogin = async (req, res, next) => {
    try{
        passport.authenticate('Admin', (err, acct, info) => {
            if (err) {
                console.log(err)
                return next(err);
            }
            if (!acct) {
                return next(info);
            }
            
            req.logIn(acct, (err) => {
                if (err) {
                    return next(err);
                }
                response.success(res, {
                    data: {
                    
                    }
                });
            });
        })(req, res, next);
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};

let addPackages = async (req, res, next) => {
    try{
        let image = req.body.image || '',
            name = req.body.name || '',
            description = req.body.description || '',
            destinationId = req.body.destinationId || '',
            price = req.body.price || '',
            status = req.body.status || '',
            discountedPrice = req.body.discountedPrice || '',
            homePage = req.body.homePage || '',
            flights = req.body.flights || '',
            hotels = req.body.hotels || '',
            transfers = req.body.transfers || '',
            daysPlan = req.body.daysPlan,
            durationOfStay = req.body.durationOfStay,
            contactNumber = req.body.contactNumber,
            contactPrefix = req.body.contactPrefix,
            minimumAge = req.body.minimumAge,
            availability = req.body.availability,
            packageStartingDate = req.body.packageStartingDate,
            departure = req.body.departure
            departureTime = req.body.departureTime,
            departurePlaceTime = req.body.departurePlaceTime,
            returnTime = req.body.returnTime,
            included = req.body.included,
            notIncluded = req.body.notIncluded,
            sightSeeing = req.body.sightSeeing || '';

            const packagesData = await new packagesModel({
                image,
                name,
                description,
                destinationId,
                price,
                status: 1,
                discountedPrice,
                homePage,
                flights,
                hotels,
                transfers,
                sightSeeing,
                daysPlan,
                durationOfStay,
                contactNumber,
                contactPrefix,
                minimumAge,
                availability,
                packageStartingDate,
                departure,
                departureTime,
                departurePlaceTime,
                returnTime,
                included,
                notIncluded
            }).save();        

            response.success(res, {
                data: {}
            });
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};


let addVisas = async (req, res, next) => {
    try{
        let name = req.body.name || '',
            status = req.body.status || '',
            image = req.body.image || '',
            currencyId = req.body.currencyId || '',
            languagesId = req.body.languagesId || '',
            countryId = req.body.countryId || '',
            heading = req.body.heading || '',
            documentsRequired = req.body.documentsRequired || '',
            description = req.body.description || '',
            validity = req.body.validity || '',
            visaType = req.body.visaType || '',
            entryType = req.body.entryType || '',
            processingTime = req.body.processingTime,
            visasPricing = req.body.visasPricing;

            const visasData = await new visasModel ({
                name,
                image,
                status: 1,
                currencyId,
                languagesId,
                countryId,
                heading,
                documentsRequired,
                description,
                validity,
                visaType,
                entryType,
                processingTime,
                visasPricing
            }).save();        

            response.success(res, {
                data: {}
            });
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};

let addBlogs = async (req, res, next) => {
    try{
        let blogPic = req.body.blogPic || '',
            blogDate = req.body.blogDate || '',
            blogCommentCount = req.body.blogCommentCount || '',
            blogTitle = req.body.blogTitle || '',
            status = req.body.status || 0,
            blogsType = req.body.blogsType || 0,
            completeBlog = req.body.completeBlog || '',
            blogSmallDesription = req.body.blogSmallDesription || '';

        await new blogsModel ({
            blogPic,
            blogDate,
            blogCommentCount,
            blogTitle,
            status: 1,
            blogsType,
            completeBlog,
            blogSmallDesription
        }).save();        

            response.success(res, {
                data: {}
            });
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};

let editPackages = async (req, res, next) => {
    try{
        let image = req.body.image || '',
            packageId = req.body.packageId || null,
            name = req.body.name || '',
            description = req.body.description || '',
            destinationId = req.body.destinationId || '',
            price = req.body.price || '',
            status = req.body.status || 0,
            discountedPrice = req.body.discountedPrice || '',
            homePage = req.body.homePage || '',
            flights = req.body.flights || '',
            hotels = req.body.hotels || '',
            daysPlan = req.body.daysPlan,
            durationOfStay = req.body.durationOfStay,
            contactNumber = req.body.contactNumber,
            contactPrefix = req.body.contactPrefix,
            minimumAge = req.body.minimumAge,
            availability = req.body.availability,
            packageStartingDate = req.body.packageStartingDate,
            departure = req.body.departure
            departureTime = req.body.departureTime,
            departurePlaceTime = req.body.departurePlaceTime,
            returnTime = req.body.returnTime,
            included = req.body.included,
            notIncluded = req.body.notIncluded,
            transfers = req.body.transfers || '',
            sightSeeing = req.body.sightSeeing || '';

            const packagesData = await packagesModel.updateOne({ _id: packageId },{
                $set:{
                    image,
                    name,
                    description,
                    destinationId,
                    price,
                    status,
                    discountedPrice,
                    homePage,
                    flights,
                    hotels,
                    transfers,
                    sightSeeing,
                    daysPlan,
                    durationOfStay,
                    contactNumber,
                    contactPrefix,
                    minimumAge,
                    availability,
                    packageStartingDate,
                    departure,
                    departureTime,
                    departurePlaceTime,
                    returnTime,
                    included,
                    notIncluded
                }
            });        

            response.success(res, {
                data: {}
            });
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};

let editVisas = async (req, res, next) => {
    try{
        let name = req.body.name || '',
            image = req.body.image || '',
            status = req.body.status || 0,
            currencyId = req.body.currencyId || '',
            languagesId = req.body.languagesId || '',
            countryId = req.body.countryId || '',
            heading = req.body.heading || '',
            documentsRequired = req.body.documentsRequired || '',
            description = req.body.description || '',
            validity = req.body.validity || '',
            visaType = req.body.visaType || '',
            entryType = req.body.entryType || '',
            visaId = req.body.visaId || null,
            processingTime = req.body.processingTime,
            visasPricing = req.body.visasPricing;

            const visasData = await visasModel.updateOne({ _id: visaId },{
                $set:{
                    name,
                    status,
                    currencyId,
                    languagesId,
                    countryId,
                    heading,
                    documentsRequired,
                    description,
                    validity,
                    visaType,
                    entryType,
                    processingTime,
                    visasPricing,
                    image
                }
            });        

            response.success(res, {
                data: {}
            });
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};

let editBlogs = async (req, res, next) => {
    try{
        let blogPic = req.body.blogPic || '',
            blogDate = req.body.blogDate || '',
            blogCommentCount = req.body.blogCommentCount || '',
            blogTitle = req.body.blogTitle || '',
            status = req.body.status || 0,
            blogId = req.body.blogId || null,
            blogsType = req.body.blogsType || 0,
            completeBlog = req.body.completeBlog || '',
            blogSmallDesription = req.body.blogSmallDesription || '';

        await blogsModel.updateOne({ _id: blogId },{
            $set:{
                blogPic,
                blogDate,
                blogCommentCount,
                blogTitle,
                status,
                blogsType,
                completeBlog,
                blogSmallDesription
            }
        });        

        response.success(res, {
            data: {}
        });
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};

let getPackages = async (req, res, next) => {
    try{
        let limit = req.query.limit ? parseInt(req.query.limit) : 100,
            offset = req.query.offset ? parseInt(req.query.offset) : 0,
            filter = {},
            searchText = req.query.searchText || '',
            packages = [];
            
        if (searchText) {
            filter['$or'] = [
                { name: { $regex: searchText, $options: "i" } },
                { description: { $regex: searchText, $options: "i" } },
                { destination: { $regex: searchText, $options: "i" } },
                { price: { $regex: searchText, $options: "i" } }
            ]
        }
        packages = await packagesModel.find(filter, {
                image: 1,
                name: 1,
                description: 1,
                destination: 1,
                price: 1,
                status: 1,
                discountedPrice: 1,
                homePage: 1,
                flights: 1,
                hotels: 1,
                transfers: 1,
                sightSeeing: 1,
                destinationId: 1
            })
            .populate('destinationId')
            .lean()
            .limit(limit)
            .skip(offset)
            .sort({ _id: -1 });

        packages.forEach(package => {
            package.destination = package.destinationId.name || '';
            delete package.destinationId;
        })

        response.success(res, {
            data: packages
        })
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};

let packagesBooking = async (req, res, next) => {
    try{
        let limit = req.query.limit ? parseInt(req.query.limit) : 100,
            offset = req.query.offset ? parseInt(req.query.offset) : 0,
            filter = {  },
            searchText = req.query.searchText || '',
            packagesBooking = [];
            
        if (searchText) {
            filter['$or'] = [
                { name: { $regex: searchText, $options: "i" } },
                { description: { $regex: searchText, $options: "i" } },
                { destination: { $regex: searchText, $options: "i" } },
                { price: { $regex: searchText, $options: "i" } }
            ]
        }
        packagesBooking = await bookingsModel.find(filter, {
                date: 1,
                roomCount: 1,
                adultCount: 1,
                adultCountMore: 1,
                childrenCount: 1,
                childrenCountMore: 1,
                userId: 1,
                packageId: 1,
                nightsStay: 1,
                name: 1,
                email: 1,
                phoneNumber: 1,
                child1: 1,
                child2: 1,
            })
            .populate('packageId  userId')
            .lean()
            .limit(limit)
            .skip(offset)
            .sort({ _id: -1 });

        packagesBooking.forEach(packageBooking => {
            packageBooking.packageName = packageBooking.packageId? packageBooking.packageId.name || '' : '';  
            packageBooking.userFirstName = packageBooking.userId? packageBooking.userId.firstName || '' : '';  
            packageBooking.userLastName = packageBooking.userId? packageBooking.userId.lastName || '' : '';  
            packageBooking.userEmail = packageBooking.userId? packageBooking.userId.email || '' : '';  
            delete packageBooking.packageId;
            delete packageBooking.userId;
        })

        response.success(res, {
            data: packagesBooking
        })
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};

let visasBooking = async (req, res, next) => {
    try{
        let limit = req.query.limit ? parseInt(req.query.limit) : 100,
            offset = req.query.offset ? parseInt(req.query.offset) : 0,
            filter = { },
            searchText = req.query.searchText || '',
            visasBooking = [];
            
        if (searchText) {
            filter['$or'] = [
                { name: { $regex: searchText, $options: "i" } },
                { description: { $regex: searchText, $options: "i" } },
                { destination: { $regex: searchText, $options: "i" } },
                { price: { $regex: searchText, $options: "i" } }
            ]
        }
        visasBooking = await visaBookingsModel.find(filter, {
                "_id": 1,
                "userId": 1,
                "date": 1,
                "adult": 1,
                "children": 1,
                "visaId": 1,
                "sendDealsByEmail": 1,
                "businessGST": 1,
                "promoCode": 1,
            })
            .populate('visaId  userId')
            .lean()
            .limit(limit)
            .skip(offset)
            .sort({ _id: -1 });

        visasBooking.forEach(visaBooking => {
            visaBooking.adultCount = visaBooking.adult? visaBooking.adult.length || 0 : 0;  
            visaBooking.childrenCount = visaBooking.children? visaBooking.children.length || 0 : 0;  
            visaBooking.visaName = visaBooking.visaId? visaBooking.visaId.name || '' : '';  
            visaBooking.userFirstName = visaBooking.userId? visaBooking.userId.firstName || '' : '';  
            visaBooking.userLastName = visaBooking.userId? visaBooking.userId.lastName || '' : '';  
            visaBooking.userEmail = visaBooking.userId? visaBooking.userId.email || '' : '';  
            delete visaBooking.visaId;
            delete visaBooking.userId;
        })

        response.success(res, {
            data: visasBooking
        })
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};

let 
getVisas = async (req, res, next) => {
    try{
        let limit = req.query.limit ? parseInt(req.query.limit) : 100,
            offset = req.query.offset ? parseInt(req.query.offset) : 0,
            filter = {},
            searchText = req.query.searchText || '',
            visas = [];
            
        if (searchText) {
            filter['$or'] = [
                { name: { $regex: searchText, $options: "i" } },
                { heading: { $regex: searchText, $options: "i" } },
                { description: { $regex: searchText, $options: "i" } }
            ]
        }
        visas = await visasModel.find(filter, {
                name: 1,
                status: 1,
                currencyId: 1,
                languagesId: 1,
                countryId: 1,
                heading: 1,
                image: 1,
                documentsRequired: 1,
                description: 1,
                validity: 1,
                visaType: 1,
                entryType: 1,
                processingTime: 1,
                visasPricing: 1
            })
            .populate('currencyId languagesId countryId')
            .lean()
            .limit(limit)
            .skip(offset)
            .sort({ _id: -1 });

            if(visas && visas.length){
                visas.forEach(visa => {
                    visa.currency = visa.currencyId.name; 
                    visa.languages = visa.languagesId.name; 
                    visa.country = visa.countryId.name;
                    delete visa.currencyId;
                    delete visa.languagesId;
                    delete visa.countryId;
                })
            }

        response.success(res, {
            data: visas
        })
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};

let getBlogs = async (req, res, next) => {
    try{
        let limit = req.query.limit ? parseInt(req.query.limit) : 100,
            offset = req.query.offset ? parseInt(req.query.offset) : 0,
            filter = {},
            searchText = req.query.searchText || '',
            blogs = [];
            
        if (searchText) {
            filter['$or'] = [
                { blogTitle: { $regex: searchText, $options: "i" } },
                { blogSmallDesription: { $regex: searchText, $options: "i" } }
            ]
        }
        blogs = await blogsModel.find(filter, {
                blogPic: 1,
                blogDate: 1,
                blogCommentCount: 1,
                blogTitle: 1,
                status: 1,
                blogsType: 1,
                completeBlog: 1,
                blogSmallDesription: 1
            })
            .lean()
            .limit(limit)
            .skip(offset)
            .sort({ _id: -1 });


        response.success(res, {
            data: blogs
        })
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};

let fetchPackage = async (req, res, next) => {
    try{
        let packageId = req.params.packageId || '',
            package = {};
            
        package = await packagesModel.findOne( {_id: packageId} ).populate('destinationId').lean();
        console.log(package)

        package.destinationName = package.destinationId.name || '';
        package.destinationId = package.destinationId._id || '';



        response.success(res, {
            data: package
        })
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};

let fetchPackageBooking = async (req, res, next) => {
    try{
        let packageBookingId = req.params.packageBookingId || null,
            packageBooking = {};
            
            packageBooking = await bookingsModel.findOne( {_id: packageBookingId} ).populate('packageId  userId flyFrom').lean();
            packageBooking.flyFrom = packageBooking.flyFrom? packageBooking.flyFrom.name || '' : '';  
            packageBooking.packageName = packageBooking.packageId? packageBooking.packageId.name || '' : '';  
            packageBooking.userFirstName = packageBooking.userId? packageBooking.userId.firstName || '' : '';  
            packageBooking.userLastName = packageBooking.userId? packageBooking.userId.lastName || '' : '';  
            packageBooking.userEmail = packageBooking.userId? packageBooking.userId.email || '' : '';  
            delete packageBooking.packageId;
            delete packageBooking.userId;

        response.success(res, {
            data: packageBooking
        })
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};

let fetchVisaBooking = async (req, res, next) => {
    try{
        let visasBookingId = req.params.visasBookingId || null,
            visaBooking = {};
            visaBooking = await visaBookingsModel.findOne( {_id: visasBookingId},{
                userId: 1,
                date: 1,
                adult: 1,
                children: 1,
                visaId: 1,
                visaTypeId: 1,
                sendDealsByEmail: 1,
                businessGST: 1,
                promoCode: 1
            } ).populate('visaId  userId').lean();


            visaBooking.visaName = visaBooking.visaId? visaBooking.visaId.name || '' : '';  
            visaBooking.userFirstName = visaBooking.userId? visaBooking.userId.firstName || '' : '';  
            visaBooking.userLastName = visaBooking.userId? visaBooking.userId.lastName || '' : '';  
            visaBooking.userEmail = visaBooking.userId? visaBooking.userId.email || '' : '';  
            
            
            visaBooking.visaId.visasPricing.forEach(visaPricing => {

                if(visaBooking.visaTypeId.equals(visaPricing._id)){
                    visaBooking.visaType = visaPricing.name
                }

            })

            delete visaBooking.visaId;
            delete visaBooking.userId;

        response.success(res, {
            data: visaBooking
        })
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};

let fetchLanguagesCountaries = async (req, res, next) => {
    try{
        let languages  = await visaLanguagesModel.find({}),
            countaries  = await visaCountariesModel.find({}),
            currencies  = await visaCurrenciesModel.find({});

        response.success(res, {
            data: {
                languages,
                countaries,
                currencies
            }
        })
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};

let fetchSubscriberEmails = async (req, res, next) => {
    try{
        let userSubscribers  = await userSubscribersModel.find({});

        response.success(res, {
            data: {
                userSubscribers
            }
        })
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};

let fetchConfigurations = async (req, res, next) => {
    try{
        let configuration  = await configurationModel.findOne({});

        response.success(res, {
            data: {
                configuration
            }
        })
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};

let fetchContactUs = async (req, res, next) => {
    try{
        let contactUs  = await contactUsModel.find({});

        response.success(res, {
            data: {
                contactUs
            }
        })
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};

let fetchBlog = async (req, res, next) => {
    try{
        let blogId = req.params.blogId || '',
            blog = {};
            
        blog = await blogsModel.findOne( {_id: blogId} );

        response.success(res, {
            data: blog
        })
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};

let fetchDestination = async (req, res, next) => {
    try{
        let destinationId = req.params.destinationId || null,
            destination = {};
            
        destination = await destinationsModel.findOne( {_id: destinationId} );

        response.success(res, {
            data: destination
        })
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};


let fetchVisa = async (req, res, next) => {
    try{
        let visaId = req.params.visaId || null,
            visa = {};
            
        visa = await visasModel.findOne({ _id: visaId })
            .populate('currencyId languagesId countryId')
            .lean();

        visa.country  = visa.countryId.name; 
        visa.languages  = visa.languagesId.name; 
        visa.currency  = visa.currencyId.name; 

        delete visa.currencyId;
        delete visa.languagesId;
        delete visa.countryId;

        response.success(res, {
            data: visa
        })
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};

let fetchDestinations = async (req, res, next) => {    
    try{

        let limit = req.query.limit ? parseInt(req.query.limit) : 0,
            offset = req.query.offset ? parseInt(req.query.offset) : 0,
            destinations = [];

        if(limit == 0){
            destinations = await destinationsModel.find({ status: 1 })
            .lean();
        } else {
            destinations = await destinationsModel.find({})
            .lean()
            .limit(limit)
            .skip(offset);
        }
    
        response.success(res, {
            data: destinations
        })
    } catch(err){
        return next({ msgCode: 1 })
    }

};

let addEditDestinations = async (req, res, next) => {    
    try{
        let _id = req.body._id || null, 
            image = req.body.image || '',
            name = req.body.name || '',
            homePage = req.body.homePage || '',
            destinations = {},
            status  = req.body.status || 0;

        if(_id){
            destinations = await destinationsModel.update({ _id }, {
                $set: {
                    image,
                    name,
                    homePage,
                    status
                }
            }, {
                new: true, upsert: true
            });
        } else {
            destinations = await new destinationsModel({
                image,
                name,
                homePage,
                status: 1
            }).save();        
        }

    
        response.success(res, {
            data: destinations
        })
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }

};

let editConfigurations = async (req, res, next) => {    
    try{
        let _id = req.body._id || null, 
            facebookLink = req.body.facebookLink || '',
            twitterLink = req.body.twitterLink || '',
            instagramLink = req.body.instagramLink || '',
            footerHeader = req.body.footerHeader || '',
            footerDescription  = req.body.footerDescription || '',
            configurations = await destinationsModel.update({ _id }, {
                $set: {
                    facebookLink,
                    twitterLink,
                    instagramLink,
                    footerHeader,
                    footerDescription
                }
            }, {
                new: true, upsert: true
            });
    
        response.success(res, {
            data: configurations
        })
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }

};

let fetchVisasFields = async (req, res, next) => {    
    try{
        let visaLanguages = await visaLanguagesModel.find({ status: 1 }, { name: 1 }),
            visaCurrencies = await visaCurrenciesModel.find({ status: 1 }, { name: 1 }),
            visaCountaries = await visaCountariesModel.find({ status: 1 }, { name: 1 });

        response.success(res, {
            data: {
                visaLanguages,
                visaCurrencies,
                visaCountaries,
            }
        })
    } catch(err){
        return next({ msgCode: 1 })
    }

};

module.exports = {
    adminLogin,
    addPackages,
    addVisas,
    addBlogs,
    fetchVisasFields,
    editPackages,
    editVisas,
    editBlogs,
    getPackages,
    packagesBooking,
    visasBooking,
    getVisas,
    getBlogs,
    fetchPackage,
    fetchPackageBooking,
    fetchVisaBooking,
    fetchLanguagesCountaries,
    fetchSubscriberEmails,
    fetchConfigurations,
    fetchContactUs,
    fetchBlog,
    fetchDestination,
    fetchVisa,
    addEditDestinations,
    editConfigurations,
    fetchDestinations
};


