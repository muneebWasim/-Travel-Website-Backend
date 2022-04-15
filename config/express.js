/**
 * Module dependencies.
 */

const express = require('express');
const session = require('express-session');
const compression = require('compression');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const helmet = require('helmet');
const mongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const cors = require('cors');
const winston = require('winston');
const helpers = require('view-helpers');
const config = require('./');
const glob = require('glob');
const fs = require('fs');
const pkg = require('../package.json');

const env = process.env.NODE_ENV || 'development';

/**
 * Expose
 */

module.exports = async function(app) {
  app.use(helmet());

  // Compression middleware (should be placed before express.static)
  app.use(
    compression({
      threshold: 512
    })
  );

  // Static files middleware
  app.use(express.static(config.root + '/public'));

  app.use(cors());

  const allowCrossDomain = function (req, res, next) {
    var allowedOrigins = [
        'http://localhost:3000',
        'http://localhost:3001'
    ];
    origin = req.headers.origin;

    if ( allowedOrigins.indexOf(origin) > -1 ) {
        origin = req.headers.origin;
    } else {
        origin = '*';
    }
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Access-Control-Allow-Headers');
      res.header('Access-Control-Allow-Credentials', true);
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      next();
  };
  app.use(allowCrossDomain);


  // Use winston on production
  let log;
  if (env !== 'development') {
    log = {
      stream: {
        write: msg => winston.info(msg)
      }
    };
  } else {
    log = 'dev';
  }

  // Don't log during tests
  // Logging middleware
  if (env !== 'test') app.use(morgan(log));

  // set views path and default layout
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'pug');

  // expose package.json to views
  app.use(function(req, res, next) {
    res.locals.pkg = pkg;
    res.locals.env = env;
    next();
  });

  // bodyParser should be above methodOverride
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());
  app.use(
    methodOverride(function(req) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        const method = req.body._method;
        delete req.body._method;
        return method;
      }
    })
  );

  // cookieParser should be above session
  app.use(cookieParser());
  app.use(
    session({
      secret: pkg.name,
      proxy: true,
      resave: true,
      saveUninitialized: true,
      store: new mongoStore({
        url: config.db,
        collection: 'sessions'
      })
    })
    );

    require('./config').loadModels(app)    
    
    // connect flash for flash messages - should be declared after sessions
    let passport = require('./passport');
      
      app.use(passport.initialize());
      app.use(passport.session());
  app.use(flash());
  require('./config').loadRoutes(app)
  const seedScript = require('./seedScript');
  seedScript.seedData();

  
  
  // should be declared after session and flash
  app.use(helpers(pkg.name));

  
  let errorObj = {};


  glob.sync('app/**/*.errors.json').forEach( file => {
    errorObj = Object.assign(JSON.parse(fs.readFileSync(file, 'utf-8')), errorObj);
  });
  
  
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    let err = new Error();
    err.status = 404;
    next(err);
  });
  
  app.use((err, req, res, next) => {
    console.log(err)
    let errorMsg = errorObj[err.msgCode].msg.EN || '';
    return res.json({
      success: 0,
      message: errorMsg,
      response: 404,
      data: {}
    });
  });

  
  // // adds CSRF support
  // if (process.env.NODE_ENV !== 'test') {
  //   app.use(csrf());
    
  //   // This could be moved to view-helpers :-)
  //   app.use(function(req, res, next) {
  //     res.locals.csrf_token = req.csrfToken();
  //     next();
  //   });
  // }
};
