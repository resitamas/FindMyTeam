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

        var temp = {};

        temp = addGreaterCriteria(criteria,req, res.tpl, "fromdate","date");
        criteria = temp.cr;
        res.tpl = temp.tpl;
        temp = addLesserCriteria(criteria,req, res.tpl, "todate", "date");
        criteria = temp.cr;
        res.tpl = temp.tpl;
        temp = addGreaterCriteria(criteria,req, res.tpl, "fromtime", "time");
        criteria = temp.cr;
        res.tpl = temp.tpl;
        temp = addLesserCriteria(criteria,req, res.tpl, "totime", "time");
        criteria = temp.cr;
        res.tpl = temp.tpl;
        criteria = addCriteria(criteria,req,"sport");
        criteria = addCriteria(criteria,req,"city");
        criteria = addCriteria(criteria,req,"level");

        console.log(criteria);

        gameModel.find(criteria, function (err, games) {

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
        }

        return cr;
    }

    function addGreaterCriteria(cr, req, tpl, key, critKey) {

        if (req.query[key] != undefined && req.query[key] != "") {
            cr[critKey] = { $gt: req.query[key] };
            tpl[key] = req.query[key];
        } else {
            tpl[key] = "";
        }

        return {cr: cr, tpl: tpl };
    }

    function addLesserCriteria(cr, req, tpl, key, critKey) {

        if (req.query[key] != undefined && req.query[key] != "") {
            cr[critKey] = { $lt: req.query[key] };
            tpl[key] = req.query[key];
        } else {
            tpl[key] = "";
        }

        return {cr: cr, tpl: tpl };
    }

};
