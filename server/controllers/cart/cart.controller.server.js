'use-strict'

// Service
let cartService = require('../../services/cart/cart.service.server');
let userService = require('../../services/user/user.service.server');

// Creates a new user
exports.addToCart = function (request, response) {
    let eventId = request.body.eventId;
    let userId = request.user._id;
    cartService
        .addToCart(eventId, userId)
        .then(function(cart) {
            userService
                .updateCartInUser(userId, cart._id)
                .then(function(status) {
                    response.status(200).json(status);
                }, function(err) {
                    response.status(404).json(err);
                });
             
        }, function(err) {
            response.status(404).json(err);
        });
              
};
// Checks if event present in User Cart
exports.getAllItemsInCart = function (request, response) {
    let userId = request.user._id;
    cartService
        .findCartIdofUser(userId)
        .then(function(cart) {
          
            response.status(200).json(cart);
        }, function(err) {
            response.status(404).json(err);
        });
              
};
//Update the cart for users
exports.updateItemInCart = function (request, response) {
    let userId = request.user._id;
    let eventId = request.body.eventId;
    let cartId = request.body.cartId;
    cartService
        .updateCart(eventId, userId, cartId)
        .then(function(cart) {
            response.status(200).json(cart);
        }, function(err) {
            response.status(404).json(err);
        });
              
};
//Get All the Items in the Cart for a user
exports.findAllCartItems = function (request, response) {
    let userId = request.user._id;
    cartService
        .findAllCartItems(userId)
        .then(function(status) {
            response.status(200).json(status);
        }, function(err) {
            response.status(404).json(err);
        });
              
};

// Update particular event related details in cart
exports.updateItemValueInCart = function(request, response) {
    let item = request.body;
    let userId = request.user._id;
    cartService
        .updateItemValueInCart(item, userId)
        .then(function(status) {
            response.status(200).json(status);
        }, function(err) {
            response.status(404).json(err);
        });
};

// Delete Item from cart
exports.deleteItem = function(request, response) {
    let eventId = request.params.eventId;
    let userId = request.user._id;
    cartService
        .deleteItem(eventId, userId)
        .then(function(status) {
            response.status(200).json(status);
        }, function(err) {
            response.status(404).json(err);
        });
};

//Get item data by event id
exports.getItemByEventId = function(request, response) {
    let eventId = request.params.eventId;
    let userId = request.user._id;
    cartService
        .getItemByEventId(eventId, userId)
        .then(function(event) {
            console.log(event);
            response.status(200).json(event);
        }, function(err) {
            response.status(404).json(err);
        });
};