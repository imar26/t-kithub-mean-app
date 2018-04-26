'use strict';
module.exports = function (app) {

    //Controllers
    let dealsController = require('../../controllers/deals/deals.cotroller.server');

    // Add promocode
    app.route("/api/addPromoCode")
        .post(dealsController.addPromoCode);

    app.route("/api/getAllCodes")
        .get(dealsController.findAllCodes);
    app.route("/api/deleteCode/:_id")
        .delete(dealsController.deleteCode);
    app.route("/api/updateCode")
        .put(dealsController.updateCode);
    app.route("/api/findCodeByName/:codeName")
        .get(dealsController.findCodeByName);

};