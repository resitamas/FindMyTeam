/**
 * Created by Resi Tamas on 30/04/2017.
 */

var requireOption = require('../middleware/requireoption').requireOption;

/**
 * Get image name and store in session
 */
module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {

        if (req.session.userid != undefined) {

            userModel.findOne({_id : req.session.userid}, function (err, result) {

                if (err) {
                    return next(err);
                }

                if (result.avatarextension != undefined && result.avatarextension != "") {
                    req.session.avatar = "/public/images/" + req.session.userid + result.avatarextension;
                } else {
                    req.session.avatar = "/public/images/avatar.png";
                }

                res.redirect("/");
            })

        } else {
            return next();
        }

    };

};
