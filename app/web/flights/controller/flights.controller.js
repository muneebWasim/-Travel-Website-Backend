const passport = require('passport'),
    mongoose = require('mongoose'),
    raw = require('./raw.json'),
    fs = require('fs').promises,
    response = require('../../../../config/response'),
    destinationsModel = mongoose.model('destinations'),
    discountsModel = mongoose.model('discounts'),
    articlesModel = mongoose.model('articles'),
    packagesModel = mongoose.model('packages'),
    flightLocationsModel = mongoose.model('flightLocations'),
    flightsModel = mongoose.model('flights');
const { exception } = require('console');
const { type } = require('os');
const uAPI = require('uapi-json');
let fetchflightsFlyingFrom = async (req, res, next) => {
    try{
        let filter = {},
            searchText = req.query.searchText || '',
            flightLocations = [];
            
        if (searchText) {
            filter = { 
                'code' : { $regex: searchText, $options: "i" }, 
                'name' : { $regex: searchText, $options: "i" }, 
                'country' : { $regex: searchText, $options: "i" }
            } 
        }

        filter.status = 1;

        flightLocations = await flightLocationsModel.aggregate([
            {$match: filter},
            { $unwind: '$destination' },
            { $project: { 
                    _id: 1,
                    code: 1,
                    name: 1,
                    country: 1
                } 
            }
            // { $sort : { age : -1, posts: 1 } }
        ])

        response.success(res, {
            data: flightLocations
        })
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};

let fetchPackages = async (req, res, next) => {
    try{
        let limit = req.query.limit ? parseInt(req.query.limit) : 100,
            offset = req.query.offset ? parseInt(req.query.offset) : 0,
            filter = {},
            searchText = req.query.searchText || '',
            flights = [];
            
        // if (searchText) {
        //     filter = { 'destination.name' : { $regex: searchText, $options: "i" } } 
        // }

        filter.status = 1;
        flights = await flightsModel.aggregate([
            {
                $lookup:
                {
                  from: 'destinations',
                  localField: 'destinationId',
                  foreignField: '_id',
                  as: 'destination'
                }
            },
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
            data: flights
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
            
        package = await packagesModel.findOne( {_id: packageId} );

        response.success(res, {
            data: package
        })
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};

let fetchflightsDestinations = async (req, res, next) => {
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

let fetchHomeScreen = async (req, res, next) => {
    try{
        let homePage = true,
            flights = await flightsModel.find({ homePage, status: 1 }),
            destinations = await destinationsModel.find({ homePage , status: 1 }),
            discounts = await discountsModel.find({ homePage , status: 1 }),
            articles = await blogsModel.find({}).limit(5);
   
        response.success(res, {
            data: {
                flights,
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
async function loadFileData(fileName) {
    const data = await fs.readFile(`./app/web/flights/controller/` + fileName, "utf8");
    return JSON.parse(data);
}

let cityToIata = async (req, res, next) => {
    try{
       let city = req.params.city || '',
           fileData = await loadFileData('cityToIata.txt');
        // let k = fileData
        let k = fileData[city]


        response.success(res, {
            data: { k }
        })
    } catch(err){
        return next({ msgCode: 1 })
    }
};


async function iataToCity(iataCode) {
    fileData = await loadFileData('iataToCity.txt');
        // let k = fileData
        let city = fileData[iataCode]
        return city;
}

async function iataToCity(iataCode) {
    fileData = await loadFileData('iataToCity.txt');
        // let k = fileData
        let city = fileData[iataCode]
        return city;
}

async function test() {
    let c = [];
    let k = [];
    fileData = await loadFileData('iataToCity.txt');
    for (const property in fileData) {
        if(property != ''){
            if(!k.includes(fileData[property])){

                k.push(fileData[property])
                c.push({
                    name: property,
                    value:fileData[property]
                })
            }
        }
        //console.log(`${property}: ${fileData[property]}`);
      }
        // let k = fileData
        //let city = fileData[iataCode]
        c = JSON.stringify(c)


        await fs.writeFile('student.txt', c);
        return c
       // return city;
}


let getFlightsData = async (req, res, next) => {
    try{
        let tripType = req.body.tripType, // 1 => round  2 => oneway 3 => multicity
            flyingFrom = req.body.flyingFrom || '',
            flyingTo = req.body.flyingTo || '',
            departureDate = req.body.departureDate || ''
            returningDate = req.body.returningDate || ''
            adults = req.body.adults || 0,
            infant = req.body.infant || 0,
            children = req.body.children || 0;

        const settings = {
            auth: {
              username: 'Universal API/uAPI-425023474',
              password: 'qrNSYAmhgfx56TbsXP89Prqwr',
              targetBranch: 'P106438',
              provider: '1V'
            },
            production: false
          }
          const airService = uAPI.createAirService(settings)
          let params

          if(tripType == 1){
              params = {
                legs:[{
                    from: flyingFrom,
                    to: flyingTo,
                    departureDate: departureDate
                }],
                pricing:{
                    currency: 'pkr'
                },
                passengers: {
                  ADT: adults,
                  INF: infant,
                  CNN: children
                }
                // cabins: ['Economy']
              }          
          }

          if(tripType == 2){
            params = {
              legs:[{
                  from: flyingFrom,
                  to: flyingTo,
                  departureDate: departureDate
              },
              {
                from: flyingTo,
                to: flyingFrom,
                departureDate: returningDate
            }],
              pricing:{
                  currency: 'pkr'
              },
              passengers: {
                ADT: adults,
                INF: infant,
                CNN: children
              }
              // cabins: ['Economy']
            }          
        }
          
          airService.shop(params).then(
          
            async (reso) => {
                // reso.forEach(res => {
                    for (const res of reso) {


                        for (const direction of res.directions) {



                        for (const dir of direction) {
                            dir.from = await iataToCity(dir.from)
                            dir.to = await iataToCity(dir.to) || dir.to

                        }
                    }
                }
                response.success(res, {
                    data: {
                        reso: reso || []
                    }
                })
            },
            err => {
                // throw err
                response.success(res, {
                    data: {
                        reso : []
                    }
                })
            }
          )
        
    } catch(err){
        console.log(err)
        return next({ msgCode: 1 })
    }
};



module.exports = {
    fetchflightsFlyingFrom,
    // fetchFlights,
    fetchPackage,
    fetchflightsDestinations,
    fetchDestinations,
    fetchOffers,
    fetchArticles,
    fetchHomeScreen,
    cityToIata,
    getFlightsData
};