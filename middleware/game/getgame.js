/**
 * Created by Resi Tamas on 2017-03-15.
 */

var requireOption = require('../requireoption').requireOption;

/**
 * Get game
 */
module.exports = function (objectrepository) {

    var gameModel = requireOption(objectrepository , 'gameModel');

    return function (req, res, next) {

        req.check("id",'Add id').isInt();

        req.getValidationResult().then(function(result) {

            if (result.isEmpty() == false) {
                console.log(result.array());
                return next(new Error("Error in params!"));
            }

            doWork(req,res,next);

        });

    };


    function doWork(req, res, next) {

        gameModel.findOne({id : req.param.id}, function (err, result) {

            if (err) {
                return next(err);
            }

            res.tpl.game = result;

            return next();
        })
    }

};
