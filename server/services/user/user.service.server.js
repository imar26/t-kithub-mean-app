'use strict';

// mongoose and user model
const mongoose = require('mongoose'),
    User = mongoose.model('userModel'),    
    q = require('q');

// Save new user
exports.registerUser = function (user) {
    let deferred = q.defer();
    User
        .create(user, function(err, user) {
            if(err) {
                deferred.abort(err);
            } else {
                deferred.resolve(user);
            }
        });
    return deferred.promise;
};

//Find User By ID
exports.findUserById = function(userId) {
    let deferred = q.defer();
    User
        .findOne({'_id': userId}, function(err, user) {
            if(err) {
                deferred.abort(err);
            } else {
                deferred.resolve(user);
            }
        });
    return deferred.promise;
};

// Find User By Credentials
exports.findUserByCredentials = function(username, password) {
    let deferred = q.defer();
    let credentials = {
        userName: username,
        password: password
    };
    User
        .find(credentials, function(err, user) {
            if(err) {
                deferred.abort(err);
            } else {
                deferred.resolve(user);
            }
        });
    return deferred.promise;
};

// Find User by Username
exports.findUserByUsername = function(username) {
    let deferred = q.defer();
    User
        .findOne({"userName": username}, function(err, user) {
            if(err) {
                deferred.abort(err);
            } else {
                deferred.resolve(user);
            }
        });
    return deferred.promise;
};

// Find User By Email Address
exports.findUserByEmail = function(email) {
    let deferred = q.defer();
    User
        .findOne({"email": email}, function(err, user) {
            if(err) {
                deferred.abort(err);
            } else {
                deferred.resolve(user);
            }
        });
    return deferred.promise;
};

// User login
exports.login = function(user, callback) {
    let deferred = q.defer();
    User
        .findOne({"userName": user.userName}, function(err, user) {
            if(err) {
                deferred.abort(err);
            } else {
                deferred.resolve(user);
            }
        });
    return deferred.promise;
};

// Get all users by user role
exports.getAllUsersByUserRole = function() {
    let deferred = q.defer();
    User
        .find({"roles":"USER"}, function(err, users) {
            if(err) {
                deferred.abort(err);
            } else {
                deferred.resolve(users);
            }
        });
    return deferred.promise;
};

// Get user details from using facebook id
exports.findUserByFacebookId = function(facebookId) {
    let deferred = q.defer();
    User
        .findOne({"facebook.id": facebookId}, function(err, user) {
            if(err) {
                deferred.abort(err);
            } else {
                deferred.resolve(user);
            }
        });
    return deferred.promise;
};

//Get user details from using google id
exports.findUserByGoogleId = function(googleId) {
    let deferred = q.defer();
    User
        .findOne({"google.id": googleId}, function(err, user) {
            if(err) {
                deferred.abort(err);
            } else {
                deferred.resolve(user);
            }
        });
    return deferred.promise;
};

// Update user details
exports.updateProfile = function(user) {
    let deferred = q.defer();
    User
        .update({"_id": user._id}, {$set: {
            "firstName": user.firstName,
            "lastName": user.lastName
        }}, function(err, user) {
            if(err) {
                deferred.abort(err);
            } else {
                deferred.resolve(user);
            }
        });
    return deferred.promise;
};

// Change user password
exports.changePassword = function(userId, newPassword) {
    let deferred = q.defer();
    User
        .update({"_id": userId}, {$set: {
            "password": newPassword
        }}, function(err, status) {
            if(err) {
                deferred.abort(err);
            } else {
                deferred.resolve(status);
            }
        });
    return deferred.promise;
};

// Add token data
exports.addTokenInfo = function(user) {
    let deferred = q.defer();
    User
        .update({"_id": user._id}, {$set: {
            "resetPasswordToken": user.resetPasswordToken,
            "resetPasswordExpires": user.resetPasswordExpires            
        }}, function(err, status) {
            if(err) {
                deferred.abort(err);
            } else {
                deferred.resolve(status);
            }
        });
    return deferred.promise;
};

// Find User by Token
exports.findUserByToken = function(token) {
    let deferred = q.defer();
    User
        .findOne({'resetPasswordToken': token, 'resetPasswordExpires': { $gt: Date.now() }}, function(err, user) {
            if(err) {
                deferred.abort(err);
            } else {
                deferred.resolve(user);
            }
        });
    return deferred.promise;
};

// Update cart in user
exports.updateCartInUser = function(userId, cartId) {
    let deferred = q.defer();
    User
        .update({'_id': userId}, {$set: {'cartId': cartId}},function(err, status) {
            if(err) {
                deferred.abort(err);
            } else {
                deferred.resolve(status);
            }
        });
    return deferred.promise;
};

// Get orders by user id
exports.getOrdersByUserId = function(userId) {
    let deferred = q.defer();
    User
        .findOne({'_id': userId}, function(err, user) {
            if(err) {
                deferred.abort(err);
            } else {
                deferred.resolve(user);
            }
        });
    return deferred.promise;
};