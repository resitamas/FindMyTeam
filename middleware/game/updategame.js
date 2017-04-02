/**
 * Created by Resi Tamas on 2017-03-15.
 */

var requireOption = require('../requireoption').requireOption;
var sports = require('../../constant/constants').sports;
var levels = require('../../constant/constants').levels;
var types = require('../../constant/constants').types;

/**
 * Update game
 */
module.exports = function (objectrepository) {

    var gameModel = requireOption(objectrepository , 'gameModel');

    return function (req, res, next) {

        var body = req.body;

        if(Object.keys(body).length === 0 && body.constructor === Object) {
            return next();
        }

        req.checkParams("id",'Add id').isInt();
        req.checkBody("sport",'Choose sport').isOneOfThem(sports);
        req.checkBody("date",'Choose date').isDate();
        req.checkBody("time",'Choose time').notEmpty();
        req.checkBody("level",'Choose level').isOneOfThem(levels);
        req.checkBody("maxplayers",'Add max player').isInt();
        req.checkBody("location",'Add location').notEmpty();
        req.checkBody("description",'Enter description').notEmpty();
        req.checkBody("type",'Enter type').isOneOfThem(types);
        req.checkBody("participants",'Players should be an array').isArray();
        req.checkBody("invited",'Invited should be an array').isArray();
        req.checkBody("requests",'Requested should be an array').isArray();

        req.getValidationResult().then(function(result) {

            if (result.isEmpty() == false) {
                return next();
            }

            doWork(req,res,next);

        });

    };

    function doWork(req, res, next) {

        gameModel.findOne({id : req.param.id}, function (err, result) {

            if (err) {
                return next(err);
            }

            result.sport = req.body.sport;
            result.date = req.body.date;
            result.time = req.body.time;
            result.level = req.body.level;
            result.maxplayers = req.body.maxplayers;
            result.location = req.body.location;
            result.description = req.body.description;
            game.type = req.body.type;
            result.players = req.body.players;
            result.invited = req.body.invited;
            result.requests = req.body.requests;

            gameModel.save(result);

            res.tpl.game = result;

            res.redirect("/games/"+result.id);
        });

    }

};
