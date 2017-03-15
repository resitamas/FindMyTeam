/**
 * Created by Resi Tamas on 2017-03-15.
 */

/**
 * Logout user
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        req.session.destroy(function (err) {
            return next();
        });
    };

};
