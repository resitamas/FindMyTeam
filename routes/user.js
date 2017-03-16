/**
 * Created by Resi Tamas on 2017-03-14.
 */

var renderMW = require('../middleware/render');
var authMW = require('../middleware/authentication/authMW');
var checkEditProfileMW = require('../middleware/authorization/checkeditprofile');
var getUserMW = require('../middleware/user/getuser');
var editUserMW = require('../middleware/user/edituser');

var path = require("path");

var userModel = require('../models/userModel');

module.exports = function  (app, dirname) {

    var objectRepository = {
        userModel: new userModel()
    };

    /**
     * User information page
     */
    app.get('/users/:id',
        authMW(objectRepository),
        getUserMW(objectRepository),
        renderMW(objectRepository,path.join(dirname+'/public/profile.html'))
    );

    /**
     * Edit user information page
     */
    app.use('/users/edit/:id',
        authMW(objectRepository),
        getUserMW(objectRepository),
        checkEditProfileMW(objectRepository),
        editUserMW(objectRepository),
        renderMW(objectRepository,path.join(dirname+'/public/editprofile.html'))
    );

};
