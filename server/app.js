'use strict';
module.exports = function(app) {
    // Models
    let userModel = require('./models/user/user.model.server');
    let cartModel = require('./models/cart/cart.model.server');
    let dealsModel = require('./models/deals/deals.model.server');
    let orderModel = require('./models/order/order.model.server');
    
    // Routes
    require('./routes/user/user.route.server')(app);
    require('./routes/cart/cart.route.server')(app);
    require('./routes/deals/deals.route.server')(app);
    require('./routes/order/order.route.server')(app);
};