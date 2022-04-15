const passport = require('passport'),
    mongoose = require('mongoose'),
    response = require('../../../../config/response'),
    destinationsModel = mongoose.model('destinations'),
    discountsModel = mongoose.model('discounts'),
    articlesModel = mongoose.model('articles'),
    flyFromModel = mongoose.model('flyFrom'),
    blogsModel = mongoose.model('blogs'),
    bookingsModel = mongoose.model('bookings'),
    packagesModel = mongoose.model('packages');

let fetchPackages = async (req, res, next) => {
    try{
        let limit = req.query.limit ? parseInt(req.query.limit) : 100,
            offset = req.query.offset ? parseInt(req.query.offset) : 0,
            filter = {},
            searchText = req.query.searchText || '',
            packages = [];
            
        if (searchText) {
            filter = { 'destination.name' : { $regex: searchText, $options: "i" } } 
        }

        filter.status = 1;

        packages = await packagesModel.aggregate([
            {
                $lookup:
                {
                  from: 'destinations',
                  localField: 'destinationId',
                  foreignField: '_id',
                  as: 'destination'
                }
            },
            {$match: filter},
            { $unwind: '$destination' },
            { $project: { 
                    image: 1,
                    name: 1,
                    description: 1,
                    price: 1,
                    status: 1,
                    discountedPrice: 1,
                    homePage: 1,
                    flights: 1,
                    hotels: 1,
                    transfers: 1,
                    sightSeeing: 1,
                    destination: '$destination.name'
                } 
            },
            { $limit : limit },
            { $skip : offset },
            // { $sort : { age : -1, posts: 1 } }
        ])

        response.success(res, {
            data: packages
        })
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};

let fetchPackage = async (req, res, next) => {
    try{
        let packageId = req.params.packageId || null,
            package = {};
            
        package = await packagesModel.findOne( {_id: packageId} ).populate('destinationId').lean();

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

let fetchPackagesDestinations = async (req, res, next) => {
    try{
        let filter = { status: 1 },
            destinations = [],
            searchText = req.query.searchText || '';

        if (searchText) {
            filter = { name: { $regex: searchText, $options: "i" } } 
        }


        destinations = await destinationsModel.find( filter, { name: 1 });    
        response.success(res, {
            data: destinations
        })
    } catch(err){
        return next({ msgCode: 1 })
    }
};

let fetchDestinations = async (req, res, next) => {    
    try{
        let destinations = await destinationsModel.find({});
    
        response.success(res, {
            data: destinations
        })
    } catch(err){
        return next({ msgCode: 1 })
    }

};

let fetchFlyFrom = async (req, res, next) => {    
    try{
        let flyFrom = await flyFromModel.find({ status: 1 });
    
        response.success(res, {
            data: flyFrom
        })
    } catch(err){
        return next({ msgCode: 1 })
    }

};

let fetchOffers = async (req, res, next) => {
    try{
        let discounts = await discountsModel.find({});
        response.success(res, {
            data: discounts
        })
    } catch(err){
        return next({ msgCode: 1 })
    }
};

let fetchArticles = async (req, res, next) => {
    try{
        let articles = await blogsModel.find({});
        response.success(res, {
            data: articles
        })
    } catch(err){
        return next({ msgCode: 1 })
    }

};

let fetchHomeScreen = async (req, res, next) => {
    try{
        let homePage = true,
            packages = await packagesModel.find({ homePage, status: 1}),
            destinations = await destinationsModel.find({ homePage }),
            discounts = await discountsModel.find({ homePage }),
            articles = await blogsModel.find({}).limit(5);
   
        response.success(res, {
            data: {
                packages,
                destinations,
                discounts,
                articles,
                address: 'this is address', 
                contactInfo: '03315039509',
                recentTips: [{
                    image: '',
                    link: ''
                },
                {
                    image: '',
                    link: ''
                },
                {
                    image: '',
                    link: ''
                }]
            }
        })
    } catch(err){
        return next({ msgCode: 1 })
    }
};

let addBooking = async (req, res, next) => {
    try{
        let date = req.body.date || 0, 
            roomCount = req.body.roomCount || 0, 
            packageId = req.body.packageId || null,
            adultCount = req.body.adultCount || 0, 
            adultCountMore = req.body.adultCountMore || false, 
            childrenCount = req.body.childrenCount || 0, 
            childrenCountMore = req.body.childrenCountMore || false, 
            flyFrom = req.body.flyFrom || null, 
            userId = req.body.userId || null, 
            nightsStay = req.body.nightsStay || 0, 
            name = req.body.name || '', 
            email = req.body.email || '', 
            phoneNumber = req.body.phoneNumber || '', 
            child1 = req.body.child1 || '', 
            child2 = req.body.child2 || '',

            bookingsData = await new bookingsModel({
                date,
                roomCount,
                adultCount,
                adultCountMore,
                childrenCount,
                childrenCountMore,
                flyFrom,
                userId,
                nightsStay,
                name,
                email,
                phoneNumber,
                child1,
                child2,
                packageId
            }).save();  
        
        response.success(res, {
            data: bookingsData
        })
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};


module.exports = {
    fetchPackages,
    fetchPackage,
    fetchPackagesDestinations,
    fetchDestinations,
    fetchFlyFrom,
    fetchOffers,
    fetchArticles,
    fetchHomeScreen,
    addBooking
};


