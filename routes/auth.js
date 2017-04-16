/**
 * Created by Resi Tamas on 2017-03-14.
 */

var renderEJSMW = require('../middleware/renderEJS');
var inverseAuthMW = require('../middleware/authentication/inverseauth');
var createUserMW = require('../middleware/user/createuser');
var loginMW = require('../middleware/authentication/login');
var logoutMW = require('../middleware/authentication/logout');

var userModel = require('../models/user');

var path = require("path");

module.exports = function (app) {

    var objectRepository = {
        userModel: userModel
    };

    /**
     * Login page
     */
    app.use('/login',
        inverseAuthMW(objectRepository),
        loginMW(objectRepository),
        renderEJSMW(objectRepository,"login.ejs")
    );

    /**
     * Register page
     */
    app.use('/register',
        inverseAuthMW(objectRepository),
        createUserMW(objectRepository),
        renderEJSMW(objectRepository,"register.ejs")
    );

    /**
     * Log out
     */
    app.get('/logout',
        logoutMW(objectRepository),
        renderEJSMW(objectRepository,"login.ejs")
    );

};