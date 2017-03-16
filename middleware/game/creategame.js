/**
 * Created by Resi Tamas on 2017-03-15.
 */

/**
 * Create game
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {

        if ((typeof req.body === 'undefined') || (typeof req.body.username === 'undefined') || (typeof req.body.password === 'undefined')) {
            res.redirect('/games/1');
        }



    };

};
