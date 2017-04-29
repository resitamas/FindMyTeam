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

        console.log("SSSSSSSSS");

        if(Object.keys(body).length === 0 && body.constructor === Object) {
            return next();
        }

        req.checkParams("id",'Add id').notEmpty();
        req.checkBody("sport",'Choose sport').isOneOfThem(sports);
        req.checkBody("date",'Choose date').isDate();
        req.checkBody("time",'Choose time').notEmpty();
        req.checkBody("level",'Choose level').isOneOfThem(levels);
        req.checkBody("maxplayers",'Add max player').isInt();
        req.checkBody("location",'Add location').notEmpty();
        req.checkBody("description",'Enter description').notEmpty();
        req.checkBody("visibility",'Enter visibility').isOneOfThem(types);
        // req.checkBody("participants",'Players should be an array').isArray();
        // req.checkBody("invited",'Invited should be an array').isArray();
        // req.checkBody("requests",'Requested should be an array').isArray();

        req.getValidationResult().then(function(result) {

            if (result.isEmpty() == false) {
                console.log(result.array());
                return next();
            }

            doWork(req,res,next);

        });

    };

    function doWork(req, res, next) {

        // gameModel.findOne({_id : req.param.id}).populate("playerids").populate("inviteids").populate("requestids").exec(function (err, result) {
        //
        //     if (err) {
        //         return next(err);
        //     }
        //
        //     result.sport = req.body.sport;
        //     result.date = req.body.date;
        //     result.time = req.body.time;
        //     result.level = req.body.level;
        //     result.maxplayers = req.body.maxplayers;
        //     result.location = req.body.location;
        //     result.description = req.body.description;
        //     game.type = req.body.type;
        //     result.playerids = req.body.playerids;
        //     result.inviteids = req.body.inviteids;
        //     result.requestids = req.body.requestids;
        //
        //     //gameModel.save(result);
        //
        //     result.save(function (err) {
        //
        //         if (err) {
        //             return next(err);
        //         }
        //
        //         res.tpl.game = result;
        //
        //         res.redirect("/games/"+result.id);
        //
        //     })
        //
        // });

        gameModel.findOne({_id : req.params.id}, function (err, result) {

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
            result.visibility = req.body.visibility;
            result.playerids = JSON.parse(req.body.playerids);
            result.inviteids = JSON.parse(req.body.inviteids);
            result.requestids = JSON.parse(req.body.requestids);

            result.save(function (err) {

                if (err) {
                    return next(err);
                }

                res.tpl.game = result;

                res.redirect("/games/"+result.id);

            })

        });

    }

};
