'use strict';
let mongoose = require('mongoose');
let userSchema = require('./user.schema.server')();
module.exports = mongoose.model('userModel', userSchema);