const winston = require('winston');



let adminLoginValidator = (req, res, next) => {
    req.assert('email', 1005).notEmpty();
    req.assert('email', 1006).isValidEmail();
    req.assert('password', 1020).notEmpty();

    validationResponse('Login Validator: ', req, next);
};



module.exports = {
    adminLoginValidator
};