/**
 * Created by Resi Tamas on 2017-03-17.
 */

/**
 * Check user can play, not play, refuse, request a game
 */
module.exports = function (objectrepository, keys) {

    return function (req, res, next) {

        if (res.tpl.game == "undefined") {
            return next("Game is missing!");
        }

        if (req.session.userid == res.tpl.game.organizer) {
            return next();
        }

        for (var i = 0; i < keys.length; i++) {
            if (res.tpl.game[keys[i]].indexOf(req.session.userid) != -1) {
                return next();
            }
        }

        return next(new Error('Not allowed!'))

    };

};
