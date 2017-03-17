/**
 * Created by Resi Tamas on 2017-03-15.
 */

/**
 * Check user can edit game
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {

        if (req.session.userid != res.tpl.game.organizer) {
            return next(new Error('Unauthorized to modify this game!'))
        }

        return next();
    };

};
