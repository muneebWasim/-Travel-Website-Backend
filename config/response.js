'use strict'; 

let success = async (res, responseData) => {
    responseData.success = 1; 
    responseData.response = 200; 
    res.json(responseData);
};

module.exports = {
    success
};