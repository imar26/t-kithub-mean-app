'use strict';

// mongoose and deals model
const mongoose = require('mongoose'),
    Deals = mongoose.model('dealsModel'),
    q = require('q');

// Add promo code
exports.addPromoCode = function (description, code, value, quantity) {
    let deferred = q.defer();
    let data = {
        description: description,
        code: code,
        value: value,
        quantity: quantity
    };
    Deals
        .create(data, function (err, deals) {
            if (err) {
                deferred.abort(err);
            } else {
                deferred.resolve(deals);
            }
        });
    return deferred.promise;
};

//get all promo codes
exports.findAllCodes = function () {
    let deferred = q.defer();
    Deals
        .find({}, function (err, deals) {
            if (err) {
                deferred.abort(err);
            } else {
                deferred.resolve(deals);
            }
        });
    return deferred.promise;
};

//get code by name
exports.findCodeByName = function (codeName) {
    console.log("inside service server");
    console.log(codeName);
    let deferred = q.defer();
    Deals
        .find({'code':codeName}, function (err, deals) {
            if (err) {
                deferred.abort(err);
            } else {
                deferred.resolve(deals);
            }
        });
    return deferred.promise;
};

//delete a specific promo code
exports.deleteCode = function (_id) {
    let deferred = q.defer();
    Deals.
        deleteOne({ '_id': _id }, function (err, deals) {
            if (err) {
                deferred.abort(err);
            } else {
                deferred.resolve(deals);
            }
        });
    return deferred.promise;
}

//update a specific promo code
exports.updateCode = function (code) {
    console.log("inside server service");
    console.log(code);
    let deferred = q.defer();
    Deals.
        update({'_id': code._id }, {
            $set: {
                'code': code.code,
                'description': code.description,
                'value': code.value,
                'quantity': code.quantity
            }
        }, function (err, code) {
            if (err) {
                deferred.abort(err);
            } else {
                deferred.resolve(code);
            }
        });
    return deferred.promise;
}
