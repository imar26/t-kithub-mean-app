'use strict';
module.exports = function(app) {
    
    //Controllers
    let cartController = require('../../controllers/cart/cart.controller.server');

    // Add details to cart
    app.route("/api/addToCart")
        .post(cartController.addToCart);
    // Get all items in cart
    app.route("/api/getAllItemsInCart")
        .get(cartController.getAllItemsInCart);
    // Add event id in particular cart
    app.route("/api/updateItemInCart")
        .put(cartController.updateItemInCart);
    // Get list of cart items    
    app.route("/api/findAllCartItems")
        .get(cartController.findAllCartItems);
    // Update particular event related details in cart
    app.route("/api/updateItemValueInCart")
        .put(cartController.updateItemValueInCart);
    // Delete item from cart    
    app.route("/api/deleteItem/:eventId")
        .delete(cartController.deleteItem);
    // Get Item details by event id
    app.route("/api/getItemByEventId/:eventId")
        .get(cartController.getItemByEventId);
};