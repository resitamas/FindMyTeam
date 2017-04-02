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

            res = setButtonVisibilities(req,res,result);

            var players = [];

            async.each(
                result.playerids,
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
                        findPlayers(result["playerids"],callback);
                    },
                    invites: function (callback) {
                        findPlayers(result["inviteids"],callback);
                    },
                    requests: function (callback) {
                        findPlayers(result["requestids"],callback);
                    }
                }
            , function (err, results) {

                if (err) {
                    return next(err);
                }

                result.players = results.players;
                result.invites = results.invites;
                result.requests = results.requests;

                res.tpl.playerslabel = "Players (" + result.players.length + ")";
                res.tpl.invitedlabel = "Invites (" + result.invites.length + ")";
                res.tpl.requestedlabel = "Requests (" + result.requests.length + ")";

                res.tpl.game = result;

                res.tpl.visibilities = visibilities;
                res.tpl.sports = sports;
                res.tpl.levels = levels;

                res.tpl.isCreate = false;

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

    function setButtonVisibilities(req, res, game) {

        res.tpl.editbutton = false;
        res.tpl.refusebutton = false;
        res.tpl.requestbutton = false;
        res.tpl.notplaybutton = false;
        res.tpl.playbutton = false;

        var id = req.session.userid;

        if (id == game.organizer) {
            res.tpl.editbutton = true;

            if (game.playerids.indexOf(id) != -1) {
                res.tpl.notplaybutton = true;
            } else {
                res.tpl.playbutton = true;
            }

        } else {
            if (game.playerids.indexOf(id) != -1) {
                res.tpl.notplaybutton = true;
            } else {
                if (game.inviteids.indexOf(id) != -1) {
                    res.tpl.refusebutton = true;
                    res.tpl.playbutton = true;
                } else {
                    if (game.requestids.indexOf(id) != -1) {
                        res.tpl.requestbutton = true;
                    }
                }
            }
        }

        return res;
    }

};
