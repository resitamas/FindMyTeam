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

        var from = "1900-01-01";
        var to =  "2100-01-01";

        var fromText = "";
        var toText = "";


        if (req.query.from != undefined && req.query.from != '') {
            from = req.query.from;
            fromText = from;
        }

        if (req.query.to != undefined && req.query.to != '') {
            to = req.query.to;
            toText = to;
        }

        async.parallel(
            {
                participates: function (cb) {
                    gameModel.find({ playerids: req.session.userid, date: {$gt: from, $lt: to } }, function (err, result) {

                        if (err) {
                            return next(err);
                        }

                        cb(null, result);

                    });
                },
                invites: function (cb) {
                    gameModel.find({ inviteids: req.session.userid, date: {$gt: from, $lt: to }}, function (err, result) {

                        if (err) {
                            return next(err);
                        }

                        cb(null, result);

                    });
                },
                requests: function (cb) {
                    gameModel.find({ requestids: req.session.userid, date: {$gt: from, $lt: to } }, function (err, result) {

                        if (err) {
                            return next(err);
                        }

                        cb(null, result);

                    });
                },
                organized: function (cb) {
                    gameModel.find({ organizer: req.session.userid, date: {$gt: from, $lt: to } }, function (err, result) {

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
                res.tpl.from = fromText;
                res.tpl.to = toText;

                return next();
            }
        );

    }

};
