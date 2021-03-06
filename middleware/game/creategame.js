/**
 * Created by Resi Tamas on 2017-03-15.
 */

var requireOption = require('../requireoption').requireOption;

var sports = require('../../constant/constants').sports;
var levels = require('../../constant/constants').levels;
var visibilities = require('../../constant/constants').types;

/**
 * Create game
 */
module.exports = function (objectrepository) {

    var gameModel = requireOption(objectrepository , 'gameModel');

    return function (req, res, next) {

        req.checkBody("sport",'Choose sport').isOneOfThem(sports);
        req.checkBody("date",'Choose date').isDate();
        req.checkBody("time",'Choose time').notEmpty();
        req.checkBody("level",'Choose level').isOneOfThem(levels);
        req.checkBody("maxplayers",'Add max player').isInt();
        req.checkBody("location",'Add location').notEmpty();
        req.checkBody("description",'Enter description').notEmpty();
        req.checkBody("visibility",'Enter visibility').isOneOfThem(visibilities);

        req.getValidationResult().then(function(result) {

            if (result.isEmpty() == false) {

                res.tpl.game = {
                    organizer: req.session.userid,
                    sport: '',
                    date: '',
                    time: '',
                    level : '',
                    description: '',
                    maxplayers: '',
                    location: '',
                    visibility: "",
                    playerids: [],
                    inviteids: [],
                    requestids: []
                };

                res.tpl.visibilities = visibilities;
                res.tpl.sports = sports;
                res.tpl.levels = levels;

                res.tpl.playerslabel = "Players (0)";
                res.tpl.invitedlabel = "Invites (0)";
                res.tpl.requestedlabel = "Requests (0)";

                res.tpl.playerids = "[]";
                res.tpl.inviteids = "[]";
                res.tpl.requestids = "[]";

                res.tpl.isCreate = true;

                return next();
            }

            doWork(req,res,next);

        });

    };

    function doWork(req, res, next) {

        var game = new gameModel();

        game.organizer = req.session.userid;
        game.sport = req.body.sport;
        game.date = req.body.date;
        game.time = req.body.time;
        game.level = req.body.level;
        game.maxplayers = req.body.maxplayers;
        game.location = req.body.location;
        game.description = req.body.description;
        game.visibility = req.body.visibility;

        game.save(function (err, result) {

            if (err) {
                return next(err);
            }

            res.redirect("/games/"+result._id);

        })

    }

};
