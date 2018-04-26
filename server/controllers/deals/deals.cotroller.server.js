'use strict'

let dealsService = require('../../services/deals/deals.service.server');

//add a new promo code
exports.addPromoCode = function (request, response) {
    let description = request.body.description;
    let code = request.body.code;
    let value = request.body.value;
    let quantity = request.body.quantity;
    dealsService
        .addPromoCode(description, code, value, quantity)
        .then(function (status) {
            response.status(200).json(status);
        }, function (err) {
            response.status(404).json(err);
        });

};

//get All promo codes
exports.findAllCodes = function(request, response){
    dealsService.findAllCodes().then(function(status){
        response.status(200).json(status);
    }, function(err){
        response.status(404).json(err);
    
    });
};

//delete a promo code
exports.deleteCode = function(request, response){
    var _id = request.params._id;
    dealsService.deleteCode(_id).then(function(status){
        response.status(200).json(status);
    }, function(err){
        response.status(404).json(err);
    
    });
};

//update a promo code
exports.updateCode = function(request, response){
    var code = request.body;
    console.log("inside controller");
    console.log(code);
    dealsService.updateCode(code).then(function(status){
        response.status(200).json(status);
    }, function(err){
        response.status(404).json(err);    
    });
};

//get code by name
exports.findCodeByName = function(request, response){
    var codeName = request.params.codeName;
    console.log("inside controller get code by name ");
    console.log(codeName);    
    dealsService.findCodeByName(codeName).then(function(status){
        response.status(200).json(status);
    }, function(err){
        response.status(404).json(err);
    });
};
