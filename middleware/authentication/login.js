/**
 * Created by Resi Tamas on 2017-03-15.
 */

var requireOption = require('../requireoption').requireOption;

/**
 * Login
 *  -validate body
 *  -check user exists
 *  -login user and redirect to main page
 */
module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository , 'userModel');

    return function (req, res, next) {

        req.checkBody("username",'Enter username').notEmpty();
        req.checkBody("password",'Enter password').notEmpty();

        req.getValidationResult().then(function(result) {

            if (result.isEmpty() == false) {

                return next();
            }

            doWork(req,res,next);

        });
    };
    
    function doWork(req, res, next) {

        var userModel = requireOption(objectrepository , 'userModel');

        userModel.findOne({name : req.body.username, password: req.body.password}, function (err, result) {

            if (err) {
                return next(err);
            }

            if (result) {
                req.session.userid = result.id;
            }

            return next();
        })
    }
};
