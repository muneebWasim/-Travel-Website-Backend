const winston = require('winston');
let adminLoginValidator = (req, res, next) => {
    validationResponse('Login Validator: ', req, next);
};
module.exports = {
    adminLoginValidator
};