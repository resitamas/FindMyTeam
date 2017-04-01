/**
 * Created by Resi Tamas on 2017-03-15.
 */

var requireOption = require('../requireoption').requireOption;
var async = require('async');
var sports = require('../../constant/constants').sports;
var levels = require('../../constant/constants').levels;
var visibilities = require('../../constant/constants').types;

/**
 * Get game
 */
module.exports = function (objectrepository, onlyPlayers) {

    var gameModel = requireOption(objectrepository , 'gameModel');
    var userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {

        req.check("id",'Add id').isInt();

        req.getValidationResult().then(function(result) {

            if (result.isEmpty() == false) {
                return next(new Error("Error in params!"));
            }

            if (onlyPlayers) {
                getGameOnlyWithPlayers(req,res,next);
            } else {
                getGame(req,res,next);
            }

        });

    };

    function getGameOnlyWithPlayers(req, res, next) {

        gameModel.findOne({id : req.param.id}, function (err, result) {

            if (err) {
                return next(err);
            }

            var players = [];

            async.each(
                result.players,
                function (item, callback) {
                    userModel.findOne({id: item}, function (err, playerResult) {

                        if (err) {
                            return next(err);
                        }

                        players.push(playerResult);

                        callback();
                    });
                },
                function (err) {

                    result.players = players;

                    res.tpl.game = result;
                    res.tpl.label = "Players (" + result.maxplayers + "/" + result.players.length + ")";
                    res.tpl.visibilities = visibilities;
                    res.tpl.sports = sports;
                    res.tpl.levels = levels;

                    console.log(res.tpl);

                    return next();
                }
            );
        });
    }

    function getGame(req, res, next) {

        gameModel.findOne({id : req.param.id}, function (err, result) {

            if (err) {
                return next(err);
            }

            async.parallel(
                {
                    players: function (callback) {
                        findPlayers(result["players"],callback);
                    },
                    invited: function (callback) {
                        findPlayers(result["invited"],callback);
                    },
                    requests: function (callback) {
                        findPlayers(result["requested"],callback);
                    }
                }
            , function (err, results) {

                if (err) {
                    return next(err);
                }

                result.playerids = JSON.stringify(result.players);
                result.invitedids = JSON.stringify(result.invited);
                result.requestsids = JSON.stringify(result.requested);

                result.players = results.players;
                result.invited = results.invited;
                result.request = results.requests;

                res.tpl.playerslabel = "Players (" + result.players.length + ")";
                res.tpl.invitedlabel = "Invites (" + result.invited.length + ")";
                res.tpl.requestedlabel = "Requests (" + result.requested.length + ")";

                res.tpl.game = result;

                res.tpl.visibilities = visibilities;
                res.tpl.sports = sports;
                res.tpl.levels = levels;

                return next();
            });
        });
    }

    function findPlayers(arr, cb) {

        var players = [];

        async.each(
            arr,
            function (item, callback) {
                userModel.findOne({id: item}, function (err, playerResult) {

                    if (err) {
                        return next(err);
                    }

                    players.push(playerResult);

                    callback();
                });
            },
            function (err) {

                if (err) {
                    return next(err);
                }

                cb(null, players);
            }
        );
    }

};
