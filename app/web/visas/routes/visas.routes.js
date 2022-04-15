const visasController = require('../controller/visas.controller'),
 	visasHelpers = require('../controller//helpers/visas.helper'),
	visassMiddleware = require('../middlewares/visas.middleware'),
    passport = require('passport');
    
    var aws = require('aws-sdk')
    var multer = require('multer')
    var multerS3 = require('multer-s3')
    
    var s3 = new aws.S3({
        secretAccessKey: "oCZ0yVZbLKygGSyeX7FiFKhZklrvllTryL9/ArQX",
        accessKeyId: "AKIAQ4NONIUNFQHR372M",
        region: "us-east-2",
        bucket: "template-web"
      })
    
    var upload = ()=>{

        return multer({
            storage: multerS3({
                s3: s3,
                bucket: 'template-web',
                contentType: multerS3.AUTO_CONTENT_TYPE,
                ACL: 'public-read',
                metadata: function (req, file, cb) {
                    console.log(file)
                cb(null, {fieldName: file.fieldname});
                },
                key: function (req, file, cb) {
                    console.log(file)
    
                cb(null, Date.now().toString())
                }
            })
        })
    }

    

module.exports = (app, ver) => {
    app.get(
        ver + '/visas/locations',
        visasController.fetchVisasLocations
    );

    app.get(
        ver + '/visas/continents/countaries',
        visasController.fetchContinentsCountaries
    );

    app.get(
        ver + '/visa/details/:countryId',
        visasController.fetchVisasDetails
    );

    app.get(
        ver + '/visa/list',
        visasController.fetchVisasList
    );

    app.get(
        ver + '/visa/types/:visaId',
        visasController.fetchVisasTypes
    );

    app.post(
        ver + '/add/visa/booking',
        visasController.addVisaBooking
    );

    app.post(
        ver + '/upload/image',
        upload().single('image'),
        visasController.uploadImage
    );
};