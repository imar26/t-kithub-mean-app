'use strict';
module.exports = function(app) {
    //Declarations
    let passport = require('passport');
    
    //Controllers
    let userController = require('../../controllers/user/user.controller.server');

    // Update user
    app.route("/api/user")
        .put(userController.updateProfile)
        .get(userController.findCurrentUser);

    //Routes to Register User
    app.route("/api/register")
        .post(userController.registerUser);

    // Change user password
    app.route("/api/changePassword/:userId")
        .put(userController.changePassword);

    // Forgot Password
    app.route("/api/forgotPassword")
        .post(userController.forgotPassword);

    // Reset password
    app.route("/api/resetPassword/")
        .post(userController.resetPassword);
    
    //Login
    app.route("/api/login")
        .post(passport.authenticate('local'), userController.login);
    
    //Logout
    app.route("/api/logout")
        .post(userController.logout);

    //LoggedIn
    app.route("/api/loggedin")
        .post(userController.loggedin);

    //LoggedIn
    app.route("/api/inSession")
        .post(userController.inSession);

    //Get all users by user role
    app.route("/api/users")
        .get(userController.checkIsAdmin, userController.getAllUsersByUserRole);

    //Check if user has admin access
    app.route("/api/isAdmin")
        .get(userController.isAdmin);
    
    //Facebook Authentication
    app.route("/auth/facebook")
        .get(passport.authenticate('facebook', { scope : 'email' }));

    if(process.env.FACEBOOK_CLIENT_ID) {
        app.get("/auth/facebook/callback",
            passport.authenticate('facebook', {
                successRedirect: '/profile',
                failureRedirect: '/login'
        }));
    } else {
        app.get("/auth/facebook/callback",
            passport.authenticate('facebook', {
                successRedirect: 'http://localhost:4200/profile',
                failureRedirect: 'http://localhost:4200/login'
        }));
    }

    //Google Authentication
    app.route("/auth/google")
        .get(passport.authenticate('google', { scope : ['profile', 'email'] }));

    if(process.env.GOOGLE_CLIENT_ID) {
        app.get("/auth/google/callback",
            passport.authenticate('google', {
                successRedirect: '/profile',
                failureRedirect: '/login'
        }));
    } else {
        app.get("/auth/google/callback",
            passport.authenticate('google', {
                successRedirect: 'http://localhost:4200/profile',
                failureRedirect: 'http://localhost:4200/login'
        }));
    }  
    
    // Get orders by user id
    app.route("/api/orders/")
        .get(userController.getOrders);
    
};