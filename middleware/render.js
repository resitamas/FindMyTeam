/**
 * Created by Resi Tamas on 2017-03-14.
 */

/**
 * Send html
 */
module.exports = function (objectrepository, viewName) {

    return function (req, res) {
        res.sendFile(viewName);
    };

};
