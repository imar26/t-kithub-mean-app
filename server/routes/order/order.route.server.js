'use strict';
module.exports = function(app) {
    
    //Controllers
    let orderController = require('../../controllers/order/order.controller.server');

    // Add order to db
    app.route("/api/addOrder/:eventId")
        .post(orderController.addOrder);    
    // Order details by order id
    app.route("/api/orders/:orderId")
        .get(orderController.getOrderDetails);
};