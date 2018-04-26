'use strict';
let mongoose = require('mongoose');
let orderSchema = require('./order.schema.server')();
module.exports = mongoose.model('orderModel', orderSchema);