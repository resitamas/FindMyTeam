/**
 * Created by Resi Tamas on 2017-03-15.
 */

var sports = require('../../constant/constants').sports;
var levels = require('../../constant/constants').levels;
var requireOption = require('../requireoption').requireOption;

/**
 * Search games
 */
module.exports = function (objectrepository) {

    var gameModel = requireOption(objectrepository , 'gameModel');

    return function (req, res, next) {

        var criteria = {};

        criteria = addCriteria(criteria,req,"fromdate");
        criteria = addCriteria(criteria,req,"todate");
        criteria = addCriteria(criteria,req,"fromtime");
        criteria = addCriteria(criteria,req,"totime");
        criteria = addCriteria(criteria,req,"sport");
        criteria = addCriteria(criteria,req,"city");
        criteria = addCriteria(criteria,req,"level");

        gameModel.findGames(criteria, function (err, games) {

            if (err) {
                return next(err);
            }

            res.tpl.games = games;
            res.tpl.criteria = criteria;
            res.tpl.sports = sports;
            res.tpl.levels = levels;

            return next();
        });
    };


    function addCriteria(cr, req, key) {

        if (req.query[key] != undefined && req.query[key] != "") {
            cr[key] = req.query[key];
        } else {
            cr[key] = '';
        }

        return cr;
    }


};
