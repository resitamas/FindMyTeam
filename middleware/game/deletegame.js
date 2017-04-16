/**
 * Created by Resi Tamas on 2017-03-15.
 */

var requireOption = require('../requireoption').requireOption;

/**
 * Delete game
 */
module.exports = function (objectrepository) {

    var gameModel = requireOption(objectrepository , 'gameModel');

    return function (req, res, next) {


        req.checkBody("id",'Add game id').isInt();

        req.getValidationResult().then(function(result) {

            if (result.isEmpty() == false) {
                return next();
            }

            doWork(req,res,next);

        });

    };

    function doWork(req, res, next) {

        // gameModel.delete(req.body.id, function (err, id) {
        //
        //     if (err) {
        //         return next();
        //     }
        //
        //     res.redirect("/");
        // });

        gameModel.remove({_id: req.body.id}, function (err) {
                if (err) {
                    return next();
                }

                res.redirect("/");
        })

    }

};
