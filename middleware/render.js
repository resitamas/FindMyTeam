/**
 * Created by Resi Tamas on 2017-03-14.
 */

/**
 * Using the template engine render the values into the template
 */
module.exports = function (objectrepository, viewName) {

    return function (req, res) {
        res.sendFile(viewName);
    };

};
