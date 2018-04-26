'use strict';

// Declarations
let passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require("bcrypt-nodejs"),
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    nodemailer = require('nodemailer');

let smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        auth: {
            user: 'temporarywebtools2017@gmail.com',
            pass: 'temporary'
        }
    });

// Config
let facebookConfig,
    googleConfig;

if(process.env.FACEBOOK_CLIENT_ID) {
    facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['email', 'id', 'first_name', 'gender', 'last_name', 'picture']
    };	
}

if(process.env.GOOGLE_CLIENT_ID) {
    googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };	
} else {
    googleConfig = {
        clientID     : '314132914902-bnj3d91rdm4p1etmgton5spo9itrhm6e.apps.googleusercontent.com',
        clientSecret : 'vTE-qQi7iXHm_iw6FHLi-wB_',
        callbackURL  : 'http://localhost:3000/auth/google/callback'
    };
}

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

passport.use(new LocalStrategy(localStrategy));
if(facebookConfig) {
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
}
passport.use(new GoogleStrategy(googleConfig, googleStrategy));

//serializeUser method to store an encrypted representation of the user in a cookie
function serializeUser(user, done) {
    done(null, user);
}

//deserializeUser method to retrieve the currently logged in user from the encrypted cookie created in serializeUser
function deserializeUser(user, done) {
    if(user instanceof Array) {
        userService
            .findUserById(user[0]._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    } else {
        userService
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }
}

//Local Strategy
function localStrategy(username, password, done) {
    userService
        .findUserByUsername(username)
        .then(function(user) {
            if(user == null) {
                return done(null, "User not found");
            } else if(user.userName === username && bcrypt.compareSync(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, "Invalid Credentials");
            }
        }, function(err) {
            if (err) { 
                return done(err); 
            }
        });
}

// Facebook Strategy
function facebookStrategy(token, refreshToken, profile, done) {
    userService
        .findUserByFacebookId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newFacebookUser = {
                        userName:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        facebook: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userService
                            .registerUser(newFacebookUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

// Google Strategy
function googleStrategy(token, refreshToken, profile, done) {
    userService
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        userName:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userService.registerUser(newGoogleUser);                    
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

// Service
let userService = require('../../services/user/user.service.server');

// Creates a new user
exports.registerUser = function (request, response) {
    let userData = request.body;
    userData.password = bcrypt.hashSync(userData.password);
    userService
        .findUserByUsername(userData.userName)
        .then(function(user) {
            if(user) {
                response.status(403).send("Username already exists");
            } else {
                userService
                    .findUserByEmail(userData.email)
                    .then(function(user) {
                        if(user) {
                            response.status(403).send("Email Address already exists");
                        } else {
                            userService.registerUser(userData)
                                .then(function(user) {
                                    let mailOptions = {
                                        to: user.email,
                                        from: 'no-reply@t-kithub.com',
                                        subject: 'T-KitHub - User Registered',
                                        text: 'Hello,\n\n' +
                                        'This is a confirmation that the user with the email ' + user.email + ' has just been registered.\n'
                                    };
                                    smtpTransport.sendMail(mailOptions, function(err, res) {
                                        if(err) {
                                            response.status(403).json(err);
                                        } else {
                                            request.login(user, function(err) {
                                                response.json(user);
                                            });
                                        }
                                    });                                    
                                });
                        }
                    }, function(err) {
                        if (err) { 
                            return done(err); 
                        }
                    });                
            }
        }, function(err) {
            if (err) { 
                return done(err); 
            }
        });    
};

// Login
exports.login = function(request, response) {
    response.json(request.user);
}

// Logout
exports.logout = function(request, response) {
    request.logOut();
    response.sendStatus(200);
};

// LoggedIn
exports.loggedin = function(request, response) {
    if(request.isAuthenticated()) {
        response.send(request.user);
    } else {
        response.send('0');
    }
};

// Check if user in session
exports.inSession = function(request, response) {
    if(request.isAuthenticated()) {
        response.send(request.user);
    } else {
        response.send('0');
    }
};

// Get all users by user role
exports.getAllUsersByUserRole = function(request, response) {
    userService
        .getAllUsersByUserRole()
        .then(function(users) {
            response.status(200).json(users);
        }, function(err) {
            response.status(404).json(err);
        });
};

// Check if the user is admin
exports.isAdmin = function(request, response) {
    if(request.isAuthenticated() && request.user.roles.indexOf('ADMIN') > -1) {
        response.json(request.user);
    } else {
        response.send('0');
    }
};

// Check if the user is admin
exports.checkIsAdmin = function(request, response, next) {
    if(request.isAuthenticated() && request.user.roles.indexOf('ADMIN') > -1) {
        next();
    } else {
        response.send(401);
    }
};

// Update user profile
exports.updateProfile = function(request, response) {
    let user = request.body;
    userService
        .updateProfile(user)
        .then(function(user) {
            response.status(200).json(user);
        }, function(err) {
            response.status(404).json(err);
        });
};

// Find current user
exports.findCurrentUser = function(request, response) {
    response.json(request.user);
};

// Change password
exports.changePassword = function(request, response) {
    let userId = request.params.userId;
    let data = request.body;
    userService
        .findUserById(userId)
        .then(function(user) {
            if(bcrypt.compareSync(data.oldPassword, user.password)) {
                data.newPassword = bcrypt.hashSync(data.newPassword);
                userService
                    .changePassword(userId, data.newPassword)
                    .then(function(status) {
                        response.status(200).send(status);
                    }, function(err) {
                        response.status(403).send(err);
                    });               
            } else {
                response.status(403).json("Old");
            }      
        }, function(err) {
            response.status(403).json(err);
        }); 
};

// Forgot Password
exports.forgotPassword = function(request, response) {
    let email = request.body.email;
    userService
        .findUserByEmail(email)
        .then(function(user) {
            if(user != null && user.password) {
                let token = require('crypto').randomBytes(32).toString('hex');
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour = 3600000
                userService
                    .addTokenInfo(user)
                    .then(function(status) {                        
                        if(status) {
                            let mailOptions = {
                                to: user.email,
                                from: 'no-reply@t-kithub.com',
                                subject: 'T-KitHub - Password Reset',
                                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                                  'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                                  request.headers.origin + '/reset/' + token + '\n\n' +
                                  'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                            };
                            smtpTransport.sendMail(mailOptions, function(err, res) {
                                if(err) {
                                    response.status(403).json("Cannot send");
                                } else {
                                    response.status(200).json("Mail sent");
                                }
                            });
                        }
                    }, function(err) {
                        response.status(404).json(err);
                    });
            } else if(user != null && (user.google || user.facebook)) {
                response.status(404).json("NA");                
            } else {
                response.status(404).json("Not found");
            }
        }, function(err) {
            response.status(404).json(err);
        });
};

// Reset password
exports.resetPassword = function(request, response) {
    let token = request.body.token;
    let data = request.body.data;
    userService
        .findUserByToken(token)
        .then(function(user) {
            if(user) {
                data.newPassword = bcrypt.hashSync(data.newPassword);
                userService
                    .changePassword(user._id, data.newPassword)
                    .then(function(status) {
                        if(status) {
                            let mailOptions = {
                                to: user.email,
                                from: 'no-reply@t-kithub.com',
                                subject: 'T-KitHub - Password Changed Successfully',
                                text: 'Hello,\n\n' +
                                'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
                            };
                            smtpTransport.sendMail(mailOptions, function(err, res) {
                                if(err) {
                                    response.status(403).json(err);
                                } else {
                                    response.status(200).json(status);
                                }
                            });
                        }
                        response.status(200).json(status);
                    }, function(err) {
                        response.status(403).json(err);
                    });
            } else {
                response.status(403).json("Token Expired / Token Invalid");
            }            
        }, function(err) {
            response.status(403).json(err);
        });
};

// Get orders by user id
exports.getOrders = function(request, response) {
    let userId = request.user._id;
    userService
        .getOrdersByUserId(userId)
        .then(function(user) {
            response.status(200).json(user);
        }, function(err) {
            response.status(404).json(err);
        });
};