/**
 * Created by Resi Tamas on 2017-03-17.
 */


/**
 * Send json
 */
module.exports = function (key) {

    return function (req, res) {

        res.json(res.tpl[key]);

    };

};
