/**
 * Created by Resi Tamas on 2017-03-14.
 */
var renderMW = require('../middleware/render');
var inverseAuthMW = require('../middleware/authentication/inverseauth');
var createUserMW = require('../middleware/user/createuser');
var loginMW = require('../middleware/authentication/login');
var logoutMW = require('../middleware/authentication/logout');

var userModel = require('../models/userModel');

var path = require("path");

module.exports = function (app, dirname) {

    var objectRepository = {
        userModel: userModel
    };

    /**
     * Login page
     */
    app.use('/login',
        inverseAuthMW(objectRepository),
        loginMW(objectRepository),
        renderMW(objectRepository,path.join(dirname+'/public/login.html'))
    );

    /**
     * Register page
     */
    app.use('/register',
        inverseAuthMW(objectRepository),
        createUserMW(objectRepository),
        renderMW(objectRepository,path.join(dirname+'/public/register.html'))
    );

    /**
     * Log out
     */
    app.get('/logout',
        logoutMW(objectRepository),
        renderMW(objectRepository,path.join(dirname+'/public/login.html'))
    );

};