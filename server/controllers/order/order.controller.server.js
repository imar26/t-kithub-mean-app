'use-strict'

// Service
let orderService = require('../../services/order/order.service.server');
let cartService = require('../../services/cart/cart.service.server');

// Creates a new user
exports.addOrder = function (request, response) {
    let eventId = request.params.eventId;
    let order = request.body;
    let userId = request.user._id;
    orderService
        .addOrder(eventId, order, userId)
        .then(function(order) {
            if(order) {
                cartService
                    .deleteItem(eventId, userId)
                    .then(function(status) {
                        if(status) {
                            response.status(200).json(status);                                
                        }
                    }, function(err) {
                        response.status(404).json(err);
                    });
            }
        }, function(err) {
            response.status(404).json(err);
        });           
};

// Get order details
exports.getOrderDetails = function(request, response) {
    let orderId = request.params.orderId;
    orderService
        .getOrderDetails(orderId)
        .then(function(order) {
            if(order) {
                response.status(200).json(order);                                
            }
        }, function(err) {
            response.status(404).json(err);
        });
};