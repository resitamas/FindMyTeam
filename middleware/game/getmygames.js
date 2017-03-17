/**
 * Created by Resi Tamas on 2017-03-15.
 */

var requireOption = require('../requireoption').requireOption;


/**
 * Get games (participated, invited, requested and organized)
 */
module.exports = function (objectrepository) {

    var gameModel = requireOption(objectrepository , 'gameModel');

    return function (req, res, next) {

        req.checkQuery("from",'Not correct date format').optional().isCorrectDate();
        req.checkQuery("to",'Not correct date format').optional().isCorrectDate();

        req.getValidationResult().then(function(result) {

            if (result.isEmpty() == false) {
                return next(new Error("Error in params!"));
            }

            doWork(req,res,next);

        });

    };


    function doWork(req, res, next) {

        var from = 2000-01-01;
        var to =  2100-01-01;

        if (req.query.from !== 'undefined' && req.query.from != '') {
            from = req.query.from;
        }

        if (req.query.to !== 'undefined' && req.query.to != '') {
            to = req.query.to;
        }

        gameModel.myGames({userid : req.session.userid, from: from, to: to}, function (err, result) {

            if (err) {
                return next(err);
            }

            res.tpl.games = result;

            return next();
        })
    }

};
