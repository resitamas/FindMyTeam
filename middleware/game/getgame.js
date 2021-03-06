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

        req.check("id",'Add id').notEmpty();

        req.getValidationResult().then(function(result) {

            if (result.isEmpty() == false) {
                return next(new Error("Error in params!"));
            }

            getGame(req,res,next, onlyPlayers);

            // if (onlyPlayers) {
            //     getGameOnlyWithPlayers(req,res,next);
            // } else {
            //     getGame(req,res,next);
            // }

        });

    };

    function getGameOnlyWithPlayers(req, res, next) {

        gameModel.findOne({_id : req.params.id}).populate("organizer").populate("playerids").exec(function (err, result) {

            if (err) {
                return next(err);
            }

            res = setButtonVisibilities(req,res,result);

            res.tpl.game = result;
            res.tpl.label = "Players (" + result.maxplayers + "/" + result.playerids.length + ")";
            res.tpl.visibilities = visibilities;
            res.tpl.sports = sports;
            res.tpl.levels = levels;

            return next();

        });

    }

    function getGame(req, res, next, onlyPlayers) {

        var gameId = req.params.id;

        if (gameId == undefined || gameId == "undefined") {
            gameId = req.body.id;
        }

        gameModel.findOne({_id : gameId}).populate("organizer").populate("requestids").populate("playerids").populate("inviteids").exec(function (err, result) {

            if (err) {
                return next(err);
            }

            if (onlyPlayers) {
                res.tpl.label = "Players (" + result.maxplayers + "/" + result.playerids.length + ")";
                res = setButtonVisibilities(req,res,result);
            } else {
                res.tpl.playerslabel = "Players (" + result.playerids.length + ")";
                res.tpl.invitedlabel = "Invites (" + result.inviteids.length + ")";
                res.tpl.requestedlabel = "Requests (" + result.requestids.length + ")";
            }

            res.tpl.game = result;

            res.tpl.visibilities = visibilities;
            res.tpl.sports = sports;
            res.tpl.levels = levels;

            res.tpl.isCreate = false;

            async.parallel(
                {
                    playerids: function (cb) {
                        cb(null, result.playerids.map(function (e) {
                            return e._id;
                        }))
                    },
                    inviteids: function (cb) {
                        cb(null, result.inviteids.map(function (e) {
                            return e._id;
                        }));
                    },
                    requestids: function (cb) {
                        cb(null, result.requestids.map(function (e) {
                            return e._id;
                        }));
                    }
                }, function (err, results) {

                    if (err) {
                        return next(err);
                    }

                    res.tpl.playerids = JSON.stringify(results.playerids);
                    res.tpl.inviteids = JSON.stringify(results.inviteids);
                    res.tpl.requestids = JSON.stringify(results.requestids);

                    return next();
                }
            )

        });
    }

    function setButtonVisibilities(req, res, game) {

        res.tpl.editbutton = false;
        res.tpl.refusebutton = false;
        res.tpl.requestbutton = false;
        res.tpl.notplaybutton = false;
        res.tpl.playbutton = false;

        var id = req.session.userid;

        if (id == game.organizer._id) {

            res.tpl.editbutton = true;

            if (isInArray(game.playerids,id, "_id")) {
                res.tpl.notplaybutton = true;
            } else {
                res.tpl.playbutton = true;
            }

        } else {
            if (isInArray(game.playerids,id, "_id")) {
                res.tpl.notplaybutton = true;
            } else {
                if (isInArray(game.inviteids,id, "_id")) {
                    res.tpl.refusebutton = true;
                    res.tpl.playbutton = true;
                } else {
                    if (!isInArray(game.requestids,id, "_id")) {
                        res.tpl.requestbutton = true;
                    }
                }
            }
        }

        return res;
    }

    function isInArray(arr, element, key) {

        return arr.find(function (el) {

            return el[key] == element;

        }) != undefined;
    }

};
