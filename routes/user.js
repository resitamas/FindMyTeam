/**
 * Created by Resi Tamas on 2017-03-14.
 */

var renderEJSMW = require('../middleware/renderEJS');
var jsonSenderMW = require('../middleware/jsonsender');
var authMW = require('../middleware/authentication/authMW');
var checkEditProfileMW = require('../middleware/authorization/checkeditprofile');
var getUserMW = require('../middleware/user/getuser');
var getUsersMW = require('../middleware/user/getusers');
var editUserMW = require('../middleware/user/edituser');

var path = require("path");

var userModel = require('../models/user');

module.exports = function  (app) {

    var objectRepository = {
        userModel: userModel
    };

    /**
     * User information page
     */
    app.get('/users/:id',
        authMW(objectRepository),
        getUserMW(objectRepository),
        renderEJSMW(objectRepository,"profile.ejs")
    );

    /**
     * Edit user information page
     */
    app.use('/users/edit/:id',
        authMW(objectRepository),
        getUserMW(objectRepository),
        checkEditProfileMW(objectRepository),
        editUserMW(objectRepository),
        renderEJSMW(objectRepository,"editprofile.ejs")
    );

    /**
     * Get users by name
     */
    app.get('/users',
        authMW(objectRepository),
        getUsersMW(objectRepository),
        jsonSenderMW('users')
    );

};
