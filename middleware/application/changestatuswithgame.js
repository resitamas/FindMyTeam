/**
 * Created by Resi Tamas on 2017-03-15.
 */

var requireOption = require('../requireoption').requireOption;

/**
 * Play game
 */
module.exports = function (objectrepository, from, to) {

    var gameModel = requireOption(objectrepository , 'gameModel');

    return function (req, res, next) {

        if (res.tpl.game == "undefined") {
            return next("Game is missing!");
        }

        gameModel.findOne({id : res.tpl.game.id}, function (err, result) {

            if (err) {
                return next(err);
            }

            if (from != undefined) {

                for (var i = 0; i < from.length; i++) {
                    result[from[i]] = removeFrom(result[from[i]],req.session.userid);
                }
            }

            if (to != undefined && !(req.session.userid == result.organizer && from == 'playerids') ) {
                result[to].push(req.session.userid);
            }

            //gameModel.save(result);

            result.save(function (err) {

                res.tpl.game = result;

                res.redirect("/games/"+result.id);

            })


        });

    };

    function removeFrom(array, element) {

        var index = array.indexOf(element);

        if (index > -1) {
            array.splice(index,1);
        }

        return array;
    }

};
