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
        req.checkBody("inviteids",'Invited should be an array').isArray();
        req.checkBody("requestids",'Requested should be an array').isArray();

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
                    requestids: [],
                    players: [],
                    invites: [],
                    requests: []
                };

                res.tpl.visibilities = visibilities;
                res.tpl.sports = sports;
                res.tpl.levels = levels;

                res.tpl.playerslabel = "Players (0)";
                res.tpl.invitedlabel = "Invites (0)";
                res.tpl.requestedlabel = "Requests (0)";

                res.tpl.isCreate = true;

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
        game.playerids = req.body.playerids;
        game.inviteids = req.body.inviteids;
        game.requestids = req.body.requestids;

        //gameModel.save(game);
        game.svae(function (err, result) {

            if (err) {
                return next(err);
            }

            res.redirect("/games/"+result.id);


        })

    }

};
