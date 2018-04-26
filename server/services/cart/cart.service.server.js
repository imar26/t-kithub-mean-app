'use strict';

// mongoose and cart model
const mongoose = require('mongoose'),
    Cart = mongoose.model('cartModel'),
    q = require('q');

// Adds event to cart
exports.addToCart = function (eventId, userId) {
    let deferred = q.defer();
    let data = {
        userId: userId,
        events: []
    };
    let eventObj = {
        eventId: eventId,
        data: {
            packageType: '',
            price:'',
            noTickets: '',
            total: ''
        }
    }
    data.events.push(eventObj);
    Cart
        .create(data, function (err, event) {
            if (err) {
                deferred.abort(err);
            } else {
                deferred.resolve(event);
            }
        });
    return deferred.promise;
};

// Find Cart Id of User
exports.findCartIdofUser = function (userId) {
    let deferred = q.defer();
    Cart
        .findOne({ "userId": userId }, function (err, cart) {
            if (err) {
                deferred.abort(err);
            } else {
                deferred.resolve(cart);
            }
        });
    return deferred.promise;
};

// Update Cart
exports.updateCart = function (eventId, userId, cartId) {
    let data = {
        eventId : eventId,
        data: {
            packageType: '',
            price:'',
            noTickets: '',
            total: ''
        }
    }
      
    let deferred = q.defer();
    Cart
        .update({ "_id": cartId }, {
            $push: {
                "events": data
            }
        }, function (err, event) {
            if (err) {
                deferred.abort(err);
            } else {
                deferred.resolve(event);
            }
        });
    return deferred.promise;
};

// Find all cart items
exports.findAllCartItems = function (userId) {
    let deferred = q.defer();
    Cart
    .find({"userId":userId}, function(err, users) {
        if(err) {
            deferred.abort(err);
        } else {
            deferred.resolve(users);
        }
    });
    return deferred.promise;
};

// Get item by event id
exports.updateItemValueInCart = function(item, userId) {
    let deferred = q.defer();
    Cart
        .findOne({'userId': userId}, function(err, items) {
            if(err) {
                deferred.abort(err);
            } else {
                for(let i=0;i<items.events.length;i++) {                    
                    if(items.events[i].eventId === item.eventId) {
                        let particularEvent = items.events[i];
                        Cart
                            .update({'events.eventId': particularEvent.eventId, 'userId': userId}, {
                                $set: {
                                    'events.$.data.packageType': item.packageType,
                                    'events.$.data.price': item.price,
                                    'events.$.data.noTickets': item.noTickets,
                                    'events.$.data.total': item.total
                                }
                            }, function(err, status) {
                                if(err) {
                                    deferred.abort(err);
                                } else {
                                    deferred.resolve(status);
                                }
                            });
                    }
                }            
            }
        });
    return deferred.promise;
};

// Delete Item from Cart
exports.deleteItem = function(eventId, userId) {
    let deferred = q.defer();
    Cart
        .findOne({'userId': userId}, function(err, items) {
            if(err) {
                deferred.abort(err);
            } else {                
                for(let i=0;i<items.events.length;i++) {                    
                    if(items.events[i].eventId === eventId) {
                        let particularEvent = items.events[i];                        
                        Cart
                            .update( 
                                {'userId': userId}, 
                                { $pull : { "events" : { "eventId" :  particularEvent.eventId } } } , 
                                function(err, status) {
                                    if(err) {
                                        deferred.abort(err);
                                    } else {
                                        deferred.resolve(status);
                                    }
                                });
                    }
                }            
            }
        });    
    return deferred.promise;
};

//Get item data by event id
exports.getItemByEventId = function(eventId, userId) {
    let deferred = q.defer();
    Cart
        .findOne({'userId': userId}, function(err, items) {
            if(err) {
                deferred.abort(err);
            } else {
                for(let i=0;i<items.events.length;i++) {                    
                    if(items.events[i].eventId === eventId) {
                        let particularEvent = items.events[i];
                        deferred.resolve(particularEvent);
                    }
                }            
            }
        });
    return deferred.promise;
};