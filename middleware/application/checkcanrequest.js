/**
 * Created by Resi Tamas on 2017-03-17.
 */

/**
 * Check user can request a game
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {

        if (res.tpl.game == "undefined") {
            return next("Game is missing!");
        }

        var game = res.tpl.game;
        var userid = req.session.userid;

        if (game.organizer == userid || chechInArray(game.requestids, userid) || chechInArray(game.inviteids, userid) || chechInArray(game.playerids, userid) || game.type == "private") {
            return next(new Error('Not allowed!'))
        }

        return next();
    };

    function chechInArray(array, element) {

        return array.indexOf(element) != -1;
    }
    
};