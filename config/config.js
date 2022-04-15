let glob = require('glob'),
    fs = require('fs'),
    errorObj = {},
    ver = '/api/v1';

loadModels = (app) => {
    glob.sync('app/**/*.model.js').forEach(file => {
       require('../' + file)(app, ver);
       console.log(`${file} loaded`)
   });
}

loadRoutes = (app) => {
    glob.sync('app/**/*.routes.js').forEach(file => {
        
       require('../' + file)(app, ver);
       console.log(`${file} loaded`)
    });
}

module.exports = {
    loadModels,
    loadRoutes
}