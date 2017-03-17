/**
 * Created by Resi Tamas on 2017-03-15.
 */

var requireOption = require('../requireoption').requireOption;

var sports = require('../../constant/constants').sports;
var levels = require('../../constant/constants').levels;
var types = require('../../constant/constants').types;

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
        req.checkBody("type",'Enter type').isOneOfThem(types);
        req.checkBody("players",'Players should be an array').isArray();
        req.checkBody("invited",'Invited should be an array').isArray();
        req.checkBody("requested",'Requested should be an array').isArray();

        req.getValidationResult().then(function(result) {

            if (result.isEmpty() == false) {
                console.log(result.array());
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
        game.players = req.body.players;
        game.invited = req.body.invited;
        game.requested = req.body.requested;

        gameModel.save(game);

        res.redirect("/games/"+result.id);

    }

};
