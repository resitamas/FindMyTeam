/**
 * Created by Resi Tamas on 2017-03-17.
 */

/**
 * Check game visibility
 * - visible, if the game is private or the user is organizer, or the user is invited or the user is playing
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {

        var game = res.tpl.game;

        if (game == "undefined") {
            return next("Game is missing!");
        }

        var userId = req.session.userid;

        if (game.type == "private") {
            if (game.organizer != userid) {
                if (game.playerids.indexOf(userid) == -1) {
                    if (game.inviteids.indexOf(userId) == -1) {
                        return next(new Error('Not allowed!'))
                    }
                }
            }
        }

        return next();
    };

};
