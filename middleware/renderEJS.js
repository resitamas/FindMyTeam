/**
 * Created by Resi Tamas on 30/03/2017.
 */

/**
 * Using the template engine render the values into the template
 */
module.exports = function (objectrepository, viewName) {

    return function (req, res) {
        if (req.session != undefined) {
            res.tpl.userid = req.session.userid;
            res.tpl.avatar = req.session.avatar;
        }
        res.render(viewName, res.tpl);
    };

};
