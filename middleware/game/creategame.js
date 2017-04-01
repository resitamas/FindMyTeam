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
        req.checkBody("type",'Enter type').isOneOfThem(visibilities);
        req.checkBody("playerids",'Players should be an array').isArray();
        req.checkBody("invitedids",'Invited should be an array').isArray();
        req.checkBody("requestedids",'Requested should be an array').isArray();

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
                    players: [],
                    invited: [],
                    requested: []
                };

                res.tpl.visibilities = visibilities;
                res.tpl.sports = sports;
                res.tpl.levels = levels;

                res.tpl.playerids = JSON.stringify([]);
                res.tpl.invitedids = JSON.stringify([]);
                res.tpl.requestsids = JSON.stringify([]);

                res.tpl.playerslabel = "Players (0)";
                res.tpl.invitedlabel = "Invites (0)";
                res.tpl.requestedlabel = "Requests (0)";

                return next();
            }

            doWork(req,res,next);

        });

    };

    function doWork(req, res, next) {

        var game = new gameModel();

        game.sport = req.body.sport;
        game.date = req.body.date;
        game.time = req.body.time;
        game.level = req.body.level;
        game.maxplayers = req.body.maxplayers;
        game.location = req.body.location;
        game.description = req.body.description;
        game.type = req.body.type;
        game.players = req.body.playersids;
        game.invited = req.body.invitedids;
        game.requested = req.body.requestedids;

        gameModel.save(game);

        res.redirect("/games/"+result.id);

    }

};
