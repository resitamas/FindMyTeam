/**
 * Created by Resi Tamas on 2017-03-14.
 */

var renderMW = require('../middleware/render');

var path = require("path");

var userModel = require('../models/userModel');

module.exports = function  (app, dirname) {

    var objectRepository = {
        userModel: userModel
    };

    /**
     * User information page
     */
    app.get('/users/:id',
        renderMW(objectRepository,path.join(dirname+'/public/profile.html'))
    );

    /**
     * Edit user information page
     */
    app.get('/users/edit/:id',
        renderMW(objectRepository,path.join(dirname+'/public/editprofile.html'))
    );

    /**
     * Save edited user
     */
    app.post('/users/edit/:id', function (req, res) {
        res.redirect("/users/"+req.params.id)
    });

};
