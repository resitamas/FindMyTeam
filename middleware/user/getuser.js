/**
 * Created by Resi Tamas on 2017-03-15.
 */

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

        userModel.findOne({id : req.param.id}, function (err, result) {

            if (err) {
                return next(err);
            }

            res.tpl.user = result;

            return next();
        })
    }
    
};