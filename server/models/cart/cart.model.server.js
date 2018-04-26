'use strict';
let mongoose = require('mongoose');
let cartSchema = require('./cart.schema.server')();
module.exports = mongoose.model('cartModel', cartSchema);