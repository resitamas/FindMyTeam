/**
 * Created by Resi Tamas on 2017-03-15.
 */

/**
 * If the user is logged in, redirects to /
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (typeof req.session.userid !== 'undefined') {
            return res.redirect('/');
        }
        return next();
    };

};
