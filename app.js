var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

var port = 3000;

app.use("/public",express.static(path.join(__dirname,'/public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/**
 * Session above all
 */
app.use(session({
    secret: 'top secret',
    cookie: {
        maxAge: 60000
    },
    resave: true,
    saveUninitialized: false
}));


/**
 * Let's create the .tpl and .error on the res object
 */
app.use(function (req, res, next) {
    res.error = [];
    res.tpl = {};
    return next();
});

/**
 * Include all the routes
 */
require('./routes/user')(app, __dirname);
require('./routes/auth')(app, __dirname);
require('./routes/game')(app, __dirname);
require('./routes/application')(app);

/**
 * Standard error handler
 */
app.use(function (err, req, res, next) {
    res.status(500).send('Sorry! Error occured!');

    //Flush out the stack to the console
    console.error(err.stack);
});

var server = app.listen(port, function () {
    console.log("App started on port " + port + "...")
});
