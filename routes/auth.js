/**
 * Created by Resi Tamas on 2017-03-14.
 */
var renderMW = require('../middleware/render');

var userModel = require('../models/userModel');

var path = require("path");

module.exports = function (app, dirname) {

    var objectRepository = {
        userModel: userModel
    };

    /**
     * Login page
     */
    app.get('/login',
        renderMW(objectRepository,path.join(dirname+'/public/login.html'))
    );

    /**
     * Register page
     */
    app.get('/register',
        renderMW(objectRepository,path.join(dirname+'/public/register.html'))
    )

    /**
     * Login
     */
    app.post('/login',function (req, res) {
        console.log("Login clicked!");
        res.redirect('/index');
    });


    app.get('/logout', function (req, res) {
        console.log("Logout clicked!");
        res.redirect('/login');
    });

    /**
     * Register
     */
    app.post('/register', function (req, res) {
        console.log("Register clicked!");
        res.redirect('/');
    });

    /**
     * Logout
     */
    app.post('/logout',function () {

    });

}