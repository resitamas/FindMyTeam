/**
 * Created by Resi Tamas on 2017-03-17.
 */

/**
 * Check games visibility
 * - visible, if the game is private or the user is organizer, or the user is invited or the user is playing
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {

        var games = res.tpl.games;

        if (games == "undefined") {
            return next("Game is missing!");
        }

        var userId = req.session.userid;

        var visiblegames = [];

        for (var i = 0; i < games.length; i++) {
            if (games[i].type != "private" || games[i].organizer == userid || games[i].players.indexOf(userid) != -1 || games[i].invited.indexOf(userId) != -1) {
                visiblegames.push(games[i]);
            }
        }

        res.tpl.games = visiblegames;

        return next();
    };

};
