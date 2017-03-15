/**
 * Created by Resi Tamas on 2017-03-15.
 */

/**
 * Refuse game request
 */
module.exports = function (objectrepository) {

    return function (req, res) {

        res.redirect("/games/1")

    };

};
