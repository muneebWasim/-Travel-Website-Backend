const passport = require('passport'),
    mongoose = require('mongoose'),
    response = require('../../../../config/response'),
    destinationsModel = mongoose.model('destinations'),
    discountsModel = mongoose.model('discounts'),
    articlesModel = mongoose.model('articles'),
    visaBookingsModel = mongoose.model('visaBookings'),
    visaCountariesModel = mongoose.model('visaCountaries'),
    visasModel = mongoose.model('visas');

let fetchVisasLocations = async (req, res, next) => {
    try{
        let filter = {},
            searchText = req.query.searchText || '',
            visaLocations = [];
            
        if (searchText) {
            filter = { 
                'name' : { $regex: searchText, $options: "i" }
            } 
        }

        filter.status = 1;
        visaLocations = await visaCountariesModel.aggregate([
            {$match: filter},
            { $project: { 
                    _id: 1,
                    name: 1,
                    price: 1
                } 
            }
        ])

        response.success(res, {
            data: visaLocations
        })
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};

let fetchContinentsCountaries = async (req, res, next) => {
    try{
        let filter = {},
            visaLocations = [];

        filter.status = 1;

        visaLocations = await visaCountariesModel.aggregate([
            {$match: filter},
            { $group : { _id : "$continent",
                name: { $push: "$$ROOT" } 
            } }
        ])

        response.success(res, {
            data: visaLocations
        })
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};

let fetchVisasDetails = async (req, res, next) => {
    try{
        let countryId = req.params.countryId || null,
            visaDetails = await visasModel.findOne({ _id: countryId }).populate(  'countryId languagesId currencyId' ).lean();

        visaDetails.country  = visaDetails.countryId.name; 
        visaDetails.languages  = visaDetails.languagesId.name; 
        visaDetails.currency  = visaDetails.currencyId.name; 

        delete visaDetails.countryId;
        delete visaDetails.languagesId;
        delete visaDetails.currencyId;

        response.success(res, {
            data: visaDetails
        })
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};

let fetchVisasList = async (req, res, next) => {
    try{
        let filter = {},
            searchText = req.query.searchText || '';
            
        if (searchText) {
            filter = { 
                'name' : { $regex: searchText, $options: "i" }
            } 
        }
        filter.status = 1;

        let visaList = await visasModel.find(filter, {_id: 1, name: 1, visasPricing: 1, image: 1}).lean();

        visaList.forEach(visa => {
            visa.price = 0
            if( visa.visasPricing && visa.visasPricing.length ){
                visa.price = visa.visasPricing[0].price;
            }
            delete visa.visasPricing;
        });

        response.success(res, {
            data: visaList
        })
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};

let fetchVisasTypes = async (req, res, next) => {
    try{
        let visaId = req.params.visaId,
            visaTypesList = await visasModel.findOne({ _id: visaId }, { visasPricing: 1 }).lean();

        response.success(res, {
            data: visaTypesList? visaTypesList.visasPricing || '': ''
        })
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};


let addVisaBooking = async (req, res, next) => {
    try{
        let userId =  null,
            date = req.body.date,
            adult = req.body.adult,
            children = req.body.children,
            visaId = req.body.visaId,
            visaTypeId = req.body.visaTypeId,
            sendDealsByEmail = req.body.sendDealsByEmail,
            businessGST = req.body.businessGST,
            promoCodeApplied = req.body.promoCodeApplied,
            promoCode = req.body.promoCode,
            visaBookingsData = await new visaBookingsModel({
                userId,
                date,
                adult,
                children,
                visaId,
                visaTypeId,
                sendDealsByEmail,
                businessGST,
                promoCode,
                promoCodeApplied,
                status: 1
            }).save();  
        
        response.success(res, {
            data: visaBookingsData
        })
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};


let uploadImage = async (req, res, next) => {
    try{
      

        response.success(res, {
            data: req.file.location
        })
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};


module.exports = {
    fetchVisasLocations,
    fetchContinentsCountaries,
    fetchVisasDetails,
    fetchVisasList,
    fetchVisasTypes,
    addVisaBooking,
    uploadImage
};

