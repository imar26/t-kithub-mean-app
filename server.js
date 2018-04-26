let express = require('express'),
    path = require('path'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'), //created model loading here
    cors = require('cors');
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');

// MongoDB Connection
let connectionString = 'mongodb://127.0.0.1:27017/t-kithub'; // for local
// TO BE UPDATED AFTER DEPLOYMENT
if(process.env.MLAB_USERNAME) { // check if running remotely
    var username = process.env.MLAB_USERNAME; // get from environment
    var password = process.env.MLAB_PASSWORD;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds251889.mlab.com:51889/heroku_z45w00bn';
}

mongoose.connect(connectionString, function() {
    console.log('MONGODB connected');
});

//Adding cookie parser and session
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'this is the secret',
    resave: true,
    saveUninitialized: true
}));

//Passport.js
app.use(passport.initialize());
app.use(passport.session());

//Adding body parser for handling request and response objects.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Point static path to dist -- For building -- REMOVE
app.use(express.static(path.join(__dirname, 'dist')));

//Enabling CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.ACCESS_HEADER || "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

//Loading server side file
require('./server/app')(app);

// For Build: Catch all other routes and return the index file -- BUILDING
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port);
console.log('T-Kithub application running on: ' + port);