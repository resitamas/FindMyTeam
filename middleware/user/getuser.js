/**
 * Created by Resi Tamas on 2017-03-15.
 */

var sports = require('../../constant/constants').sports;
var years = require('../../constant/constants').years;
var sexes = require('../../constant/constants').sexes;
var requireOption = require('../requireoption').requireOption;

/**
 * Get user
 */
module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository , 'userModel');

    return function (req, res, next) {

        req.checkParams("id",'Add id').isInt();

        req.getValidationResult().then(function(result) {

            if (result.isEmpty() == false) {
                return next(new Error("Error in params!"));
            }

            doWork(req,res,next);

        });

    };

    
    function doWork(req, res, next) {

        userModel.findOne({_id : req.param.id}, function (err, result) {

            if (err) {
                return next(err);
            }

            result.age = new Date().getFullYear() - result.birthyear;
            res.tpl.user = result;
            res.tpl.sports = sports;
            res.tpl.years = years();
            res.tpl.sexes = sexes;

            return next();
        })
    }
    
};