let mongoose = require('mongoose'),
    packagesModel = mongoose.model('packages'),
    destinationsModel = mongoose.model('destinations'),
    discountsModel = mongoose.model('discounts'),
    articlesModel = mongoose.model('articles'),
    adminModel = mongoose.model('admin'),
    flyFromModel = mongoose.model('flyFrom'),
    configurationModel =  mongoose.model('configuration'),
    visasModel = mongoose.model('visas'),
    visaLanguagesModel = mongoose.model('visaLanguages'),
    visaCurrenciesModel = mongoose.model('visaCurrencies'),
    visaCountariesModel = mongoose.model('visaCountaries'),
    blogsConfigModel = mongoose.model('blogsConfig'),
    blogsModel = mongoose.model('blogs'),
    seedData;

let createPackages = async () => {
    let packagesFound = await packagesModel.count({});
    if (!packagesFound) {
        await packagesModel.insertMany([{
                image: '',
                name: 'London Family Locations',
                destinationId: '5fac044251d2074cc4b22aa8',
                daysPlan: [{
                    day: 1,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    image: ''
                },
                {
                    day: 2,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    image: ''
                },
                {
                    day: 3,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    image: ''
                },
                {
                    day: 4,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    image: ''
                }],
                durationOfStay: 2,
                minimumAge: 14,
                availability: 50,
                packageStartingDate: 1605107821,
                departure: 'UET Taxila',
                departureTime: 1605107821,
                departurePlaceTime: 1605107821,
                returnTime : 1605107821,
                included : ['Local Transportation', 'AirFare'],
                notIncluded: ['Entry Fee'],
                price: 176000,
                discountedPrice: 125000,
                homePage: true,
                flights: true,
                hotels: true,
                transfers: true,
                sightSeeing: true
            },
            {
                image: '',
                name: 'Dubai Family Vacations',
                destinationId: '5fac044251d2074cc4b22aa9',
                daysPlan: [{
                    day: 1,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    image: ''
                },
                {
                    day: 2,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    image: ''
                },
                {
                    day: 3,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    image: ''
                },
                {
                    day: 4,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    image: ''
                }],
                durationOfStay: 2,
                minimumAge: 14,
                availability: 50,
                packageStartingDate: 1605107821,
                departure: 'UET Taxila',
                departureTime: 1605107821,
                departurePlaceTime: 1605107821,
                returnTime : 1605107821,
                included : ['Local Transportation', 'AirFare'],
                notIncluded: ['Entry Fee'],
                price: 185000,
                discountedPrice: 122000,
                homePage: true,
                flights: true,
                hotels: true,
                transfers: true,
                sightSeeing: true
            },
            {
                image: '',
                name: 'Germany, Belgium & Netherland',
                destinationId: '5fac044251d2074cc4b22ab8',
                daysPlan: [{
                    day: 1,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    image: ''
                },
                {
                    day: 2,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    image: ''
                },
                {
                    day: 3,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    image: ''
                },
                {
                    day: 4,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    image: ''
                }],
                durationOfStay: 2,
                minimumAge: 14,
                availability: 50,
                packageStartingDate: 1605107821,
                departure: 'UET Taxila',
                departureTime: 1605107821,
                departurePlaceTime: 1605107821,
                returnTime : 1605107821,
                included : ['Local Transportation', 'AirFare'],
                notIncluded: ['Entry Fee'],
                price: 171000,
                discountedPrice: 121000,
                homePage: true,
                flights: true,
                hotels: true,
                transfers: true,
                sightSeeing: true
            },
            {
                image: '',
                name: 'USA Family Locations',
                destinationId: '5fac044251d2074cc4b22ab9',
                daysPlan: [{
                    day: 1,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    image: ''
                },
                {
                    day: 2,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    image: ''
                },
                {
                    day: 3,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    image: ''
                },
                {
                    day: 4,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    image: ''
                }],
                durationOfStay: 2,
                minimumAge: 14,
                availability: 50,
                packageStartingDate: 1605107821,
                departure: 'UET Taxila',
                departureTime: 1605107821,
                departurePlaceTime: 1605107821,
                returnTime : 1605107821,
                included : ['Local Transportation', 'AirFare'],
                notIncluded: ['Entry Fee'],
                price: 176000,
                discountedPrice: 125000,
                homePage: true,
                flights: true,
                hotels: true,
                transfers: true,
                sightSeeing: true
            }
        ]);
    }
    return;
};

let createDiscounts = async () => {
    let discountsFound = await discountsModel.count({});
    if (!discountsFound) {
        await discountsModel.insertMany([{
                image: '',
                name: 'London Family Locations',
                price: 176000,
                discountedPrice: 125000,
                homePage: true,
                description1: 'This is description 1',
                description2: 'This is description 2'
            },
            {
                image: '',
                name: 'Sanitised Stay',
                price: 176000,
                discountedPrice: 125000,
                homePage: true,
                bannerDiscount: true,
                description1: 'Practice distancing together',
                description2: '40% OFF + 30% Cashback'
            }
        ]);
    }
    return;
};

let createDestinations = async () => {
    let destinationsFound = await destinationsModel.count({});
    if (!destinationsFound) {
        await destinationsModel.insertMany([{
                _id: '5fac044251d2074cc4b22aa8',
                image: '',
                name: 'London',
                homePage: true

            },
            {
                _id: '5fac044251d2074cc4b22aa9',
                image: '',
                name: 'Seoul',
                homePage: true

            },
            {
                _id: '5fac044251d2074cc4b22ab8',
                image: '',
                name: 'Paris',
                homePage: true

            },
            {
                _id: '5fac044251d2074cc4b22ab9',
                image: '',
                name: 'Tokyo',
                homePage: true

            }
        ]);
    }
    return;
};

let createVisaLanguages = async () => {
    let visaLanguagesFound = await visaLanguagesModel.count({});
    if (!visaLanguagesFound) {
        await visaLanguagesModel.insertMany([{
                _id: '5fac044251d2074cc4b22aa8',
                name: 'English',
            }
        ]);
    }
    return;
};

let createVisaCurrencies = async () => {
    let visaCurrenciesFound = await visaCurrenciesModel.count({});
    if (!visaCurrenciesFound) {
        await visaCurrenciesModel.insertMany([{
                _id: '5fac044251d2074cc4b22aa8',
                name: 'USD',
            }
        ]);
    }
    return;
};

let createVisaCountaries = async () => {
    let visaCountariesFound = await visaCountariesModel.count({});
    if (!visaCountariesFound) {
        await visaCountariesModel.insertMany([{
                _id: '5fac044251d2074cc4b22aa8',
                name: 'America',
                code: 'US',
                continent: 1
            },
            {
                _id: '5fac044251d2074cc4b22aa9',
                name: 'Canada',
                code: 'CA',
                continent: 1
            },
            {
                _id: '5fac044251d2074cc4b22ab9',
                name: 'Russia',
                code: 'RU',
                continent: 1
            }
        ]);
    }
    return;
};


let createArticles = async () => {
    let articlesFound = await articlesModel.count({});
    if (!articlesFound) {
        await articlesModel.insertMany([{
                image: '',
                name: 'Memorial day',
                homePage: true,
                date: 948499200,
                description: 'This is description'
            },
            {
                image: '',
                name: '7 tips for nomads',
                homePage: true,
                date: 948499200,
                description: 'This is description'
            },
            {
                image: '',
                name: 'Taking A Travel bag',
                homePage: true,
                date: 948499200,
                description: 'This is description'
            }
        ]);
    }
    return;
};

let createAdmin = async () => {
    let adminFound = await adminModel.count({});
    if (!adminFound) {
        await new adminModel({
            name : 'admin',
            email : 'admin@template.com',
            password : '12345678',
            profileImage : '',
            phoneNumber : '',
            phoneNumberPrefix : '',
            accountType : 3
        }).save();
    }
    return;
};

let createVisa = async () => {
    let visasFound = await visasModel.count({});
    if (!visasFound) {
        await new visasModel({
            name: 'America',
            currencyId: '5fac044251d2074cc4b22aa8',
            languagesId: '5fac044251d2074cc4b22aa8',
            countryId: '5fac044251d2074cc4b22aa8',
            heading: 'America Visa',
            documentsRequired: '<p>This is description</p>',
            description: 'This is description',
            validity: 29,
            visaType: 0,
            entryType: 0,
            processingTime: 20,
              visasPricing: [
                {
                    price: 200,
                    name: 'Single Entry',
                    services: ['jugle', 'mugle', 'kugle']
                },
                {
                    price: 300,
                    name: 'Single Entry',
                    services: ['jugle', 'mugle', 'kugle']
                },
                {
                    price: 400,
                    name: 'Single Entry',
                    services: ['jugle', 'mugle', 'kugle']
                }
            ],
            price: 30
        }).save();
    }
    return;
};

let createFlyFrom = async () => {
    let flyFromFound = await flyFromModel.count({});
    if (!flyFromFound) {
        await flyFromModel.insertMany([{
            name: 'Islamabad',
            status: 1
        },
        {
            name: 'Karachi',
            status: 1
        },
        {
            name: 'Lahore',
            status: 1
        }
    ]);
    }
    return;
};

let createConfigurations = async () => {
    let configuration = await configurationModel.count({});
    if (!configuration) {
        await configurationModel.insertMany([{
            facebookLink: "facebookLink",
            twitterLink: "twitterLink",
            instagramLink: "instagramLink",
            footerHeader: "footerHeader",
            footerDescription: "footerDescription"
        }
    ]);
    }
    return;
};

let createBlog = async () => {
    let blogsFound = await blogsModel.count({}),
        blogsConfigFound = await blogsConfigModel.count({});

    if (!blogsFound) {
        await new blogsModel({
            blogPic:'',
            blogDate: 1607539868,
            blogCommentCount: 20,
            blogTitle: 'Blog Title', 
            blogsType: '0',
            completeBlog: '', 
            blogSmallDesription: ''
        }).save();

        await new blogsModel({
            blogPic:'',
            blogDate: 1607539868,
            blogCommentCount: 20,
            blogTitle: 'Travel Blog', 
            blogsType: '1',
            completeBlog: '', 
            blogSmallDesription: ''
        }).save();
    }

    if (!blogsConfigFound) {
        new blogsConfigModel({
            blogTopLine1: 'This is line 1',
            blogTopLine2: 'This is line 2',
            blogPic: ''
        }).save();
    }
    return;
};

seedData = async () => {
    await createPackages();
    await createDiscounts();
    await createDestinations();
    await createArticles();
    await createAdmin();
    await createVisaCountaries();
    await createVisaCurrencies();
    await createVisaLanguages();
    await createVisa();
    await createBlog();
    await createFlyFrom();
    await createConfigurations()
};

module.exports = {
    seedData
};
