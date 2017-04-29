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

        req.checkBody("id",'Add game id').notEmpty();

        req.getValidationResult().then(function(result) {

            if (result.isEmpty() == false) {
                console.log(result.array());
                return next();
            }

            doWork(req,res,next);

        });

    };

    function doWork(req, res, next) {

        gameModel.remove({_id: req.body.id}, function (err) {

            if (err) {
                console.log(err);
                return next();
            }

            console.log("BBBBBBBBBBB");

            res.redirect("/");

            console.log("EEEEEEEEEEEE");
        })

    }

};
