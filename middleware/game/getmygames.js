/**
 * Created by Resi Tamas on 2017-03-15.
 */

var async = require('async');

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

        var from = "";
        var to =  "";

        if (req.query.from !== 'undefined' && req.query.from != '') {
            from = req.query.from;
        }

        if (req.query.to !== 'undefined' && req.query.to != '') {
            to = req.query.to;
        }

        async.parallel(
            {
                participates: function (cb) {
                    gameModel.find({ playerids: req.session.userid}, function (err, result) {

                        if (err) {
                            return next(err);
                        }

                        cb(null, result);

                    });
                },
                invites: function (cb) {
                    gameModel.find({ inviteids: req.session.userid}, function (err, result) {

                        if (err) {
                            return next(err);
                        }

                        cb(null, result);

                    });
                },
                requests: function (cb) {
                    gameModel.find({ requestids: req.session.userid}, function (err, result) {

                        if (err) {
                            return next(err);
                        }

                        cb(null, result);

                    });
                },
                organized: function (cb) {
                    gameModel.find({ organizer: req.session.userid}, function (err, result) {

                        if (err) {
                            return next(err);
                        }

                        cb(null, result);

                    });
                }
            },
            function (err, results) {

                if (err) {
                    return next(err);
                }

                res.tpl.participates = results.participates;
                res.tpl.invites = results.invites;
                res.tpl.requests = results.requests;
                res.tpl.organized = results.organized;
                res.tpl.from = from;
                res.tpl.to = to;

                return next();
            }
        );

        // gameModel.myGames({userid : req.session.userid, from: from, to: to}, function (err, result) {
        //
        //     if (err) {
        //         return next(err);
        //     }
        //
        //     res.tpl.participates = result.participates;
        //     res.tpl.invites = result.invites;
        //     res.tpl.requests = result.requests;
        //     res.tpl.organized = result.organized;
        //     res.tpl.from = from;
        //     res.tpl.to = to;
        //
        //     res.tpl.userid = req.session.userid;
        //
        //     return next();
        // })
    }

};
