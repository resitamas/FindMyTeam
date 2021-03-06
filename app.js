var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var session = require('express-session');
var fileUpload = require('express-fileupload');

//app.set('views engine', 'ejs');

var port = 3000;

app.use("/public",express.static(path.join(__dirname,'/public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(expressValidator({
    customValidators: {
        isArray: function(value) {
            return Array.isArray(value);
        },
        isTheSame: function(param, to) {
            return param === to;
        },
        isOneOfThem : function (param, list) {

            for (i = 0; i < list.length; i++) {
                if (list[i] == param) {
                    return true;
                }
            }

            return false;
        },
        isCorrectDate: function (date) {

            if (date == '') {
                return true;
            }

            return !isNaN(Date.parse(date));
        }
    }
}));

app.use(fileUpload());

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
require('./routes/user')(app);
require('./routes/auth')(app);
require('./routes/game')(app);
require('./routes/application')(app);

/**
 * Standard error handler
 */
app.use(function (err, req, res, next) {

    // res.status(500).sendFile(path.join(__dirname+'/public/error.html'));

    res.status(500).render('error.ejs',res.tpl);

    //Flush out the stack to the console
    console.error(err.stack);
});

var server = app.listen(port, function () {
    console.log("App started on port " + port + "...")
});
