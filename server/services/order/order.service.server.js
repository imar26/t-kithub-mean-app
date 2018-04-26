'use strict';

// mongoose and cart model
const mongoose = require('mongoose'),
    Order = mongoose.model('orderModel'),
    User = mongoose.model('userModel'),
    q = require('q');

// Adds event to cart
exports.addOrder = function (eventId, order, userId) {
    let deferred = q.defer();
    let object = {
        userId: userId,
        eventId: eventId,
        data: {
            packageType: order.packageType,
            price: order.price,
            noTickets: order.noTickets,
            total: order.total
        }
    };
    Order
        .create(object, function(err, order) {
            if(err) {
                deferred.abort(err);
            } else {
                User
                    .update({'_id': userId}, {
                        $push: {
                            "orders" : order._id
                        }
                    }, function(err, status) {
                        if(err) {
                            deferred.abort(err);
                        } else {
                            deferred.resolve(status);                            
                        }
                    });
            }
        })
        return deferred.promise;
};

// Get order details by orderId
exports.getOrderDetails = function(orderId) {
    let deferred = q.defer();
    Order
        .findOne({'_id': orderId}, function(err, order) {
            if(err) {
                deferred.abort(err);
            } else {
                deferred.resolve(order);
            }
        })
        return deferred.promise;
};