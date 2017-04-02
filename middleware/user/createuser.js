/**
 * Created by Resi Tamas on 2017-03-15.
 */

var requireOption = require('../requireoption').requireOption;
var sexes = require('../../constant/constants').sexes;
var years = require('../../constant/constants').years;
var sports = require('../../constant/constants').sports;

/**
 * Create user
 */
module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository , 'userModel');

    return function (req, res, next) {

        req.checkBody("username",'Enter username').notEmpty();
        req.checkBody("email",'Enter valid e-mail').isEmail();
        req.checkBody("password",'Enter password').notEmpty();
        req.checkBody("confirm",'Enter confirmation').notEmpty();
        req.checkBody("sex",'Choose sex').isOneOfThem(sexes);
        req.checkBody("birthyear").isOneOfThem(years());
        req.checkBody("description").notEmpty();
        req.checkBody("sports",'Sports should be array').isArray();

        req.getValidationResult().then(function(result) {

            if (result.isEmpty() == false) {
                res.tpl.sexes = sexes;
                res.tpl.years = years();
                res.tpl.sports = sports;
                return next();
            }

            doWork(req,res,next);

        });
    };


    function doWork(req, res, next) {

        userModel.findOne({email : req.body.email}, function (err, result) {

            if (err) {
                return next(err);
            }

            if (result) {
                return next();
            }

            var user = new userModel();

            user.name = req.body.username;
            user.email = req.body.email;
            user.pass = req.body.password;
            user.sex = req.body.sex;
            user.birthyear = req.body.year;
            user.description = req.body.description;
            user.sports = req.body.sports;

            userModel.save(user);

            req.session.userid = 1;
            res.redirect('/');
        });

    }

};
