'use strict';
let mongoose = require('mongoose');
let dealsSchema = require('./deals.schema.server')();
module.exports = mongoose.model('dealsModel', dealsSchema);