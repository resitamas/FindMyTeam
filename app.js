var express = require('express');
var app = express();
var path = require('path');

var port = 3000;

app.use("/public",express.static(path.join(__dirname,'/public')));

/**
 * Let's creat the .tpl and .error on the res object
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
require('./routes/apply')(app);

var server = app.listen(port, function () {

    console.log("App started on port " + port + "...")

});