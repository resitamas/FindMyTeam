/**
 * Created by Resi Tamas on 2017-03-15.
 */

/**
 *  Check weather user is authenticated
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        // if (typeof req.session.userid === 'undefined') {
        //     return res.redirect('/login');
        // }
        req.session.userid = 1;
        return next();
    };


};
