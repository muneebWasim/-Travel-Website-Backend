const passport = require('passport'),
    mongoose = require('mongoose'),
    response = require('../../../../config/response'),
    blogsConfigModel = mongoose.model('blogsConfig'),
    packagesModel = mongoose.model('packages'),
    articlesModel = mongoose.model('articles'),
    blogsModel = mongoose.model('blogs');

let fetchblogs = async (req, res, next) => {
    try{
        let limit = req.query.limit ? parseInt(req.query.limit) : 100,
            offset = req.query.offset ? parseInt(req.query.offset) : 0,
            filter = {},
            searchText = req.query.searchText || '',
            blogs = [];
            
        if (searchText) {
            filter = { 'destination.name' : { $regex: searchText, $options: "i" } } 
        }

        filter.status = 1;

        // blogs = await blogsModel.find(filter, {
        //             image: 1,
        //             name: 1,
        //             description: 1,
        //             destination: 1,
        //             price: 1,
        //             status: 1,
        //             discountedPrice: 1,
        //             homePage: 1,
        //             flights: 1,
        //             hotels: 1,
        //             transfers: 1,
        //             sightSeeing: 1
        //         }) 
        //         .lean()
        //         .limit(limit)
        //         .skip(offset)
        //         .sort({ _id: -1 });


        blogs = await blogsModel.aggregate([
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
            
        package = await blogsModel.findOne( {_id: packageId} );

        response.success(res, {
            data: package
        })
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};

let fetchblogsDestinations = async (req, res, next) => {
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

let fetchBlogsHomeScreen = async (req, res, next) => {
    try{
        let limit = req.query.limit ? parseInt(req.query.limit) : 10,
            offset = req.query.offset ? parseInt(req.query.offset) : 0,
            blogsHeader = await blogsConfigModel.findOne({}).lean(),
            blogs = await blogsModel.find({ status: 1 })
                .lean()
                .limit(limit)
                .skip(offset)
                .sort({ _id: -1 }),
            traveTipsBlogs = await blogsModel.find({ status: 1, blogsType: 1 })
                .limit(3)
                .skip(0)
                .sort({ _id: -1 }),
            packages = await packagesModel.find({}, {
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
                sightSeeing: 1}) 
                .lean()
                .limit(limit)
                .skip(offset)
                .sort({ _id: -1 });

        response.success(res, {
            data: {blogsHeader, blogs, traveTipsBlogs, packages}
        })

    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};

let fetchBlog = async (req, res, next) => {
    try{
        console.log(req.params.blogId)
        let blogId = req.params.blogId || null,
            blog = await blogsModel.findOne({ _id: blogId, status: 1 }).lean();

        response.success(res, {
            data: blog
        })

    } catch(err){
        return next({ msgCode: 1 })
    }
};

module.exports = {
    fetchblogs,
    fetchPackage,
    fetchblogsDestinations,
    fetchDestinations,
    fetchOffers,
    fetchArticles,
    fetchBlogsHomeScreen,
    fetchBlog
};