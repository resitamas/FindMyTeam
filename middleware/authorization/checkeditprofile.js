/**
 * Created by Resi Tamas on 2017-03-15.
 */

/**
 * Check logged in user can edit profile
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {

        if (res.tpl.user._id != req.session.userid) {
            return next(new Error('Unauthorized to modify this user!'))
        }

        return next();
    };

};