/**
 * Created by Resi Tamas on 2017-03-17.
 */

var requireOption = require('../requireoption').requireOption;

module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository , 'userModel');

    return function (req, res, next) {

        req.checkQuery("name",'Add name').notEmpty();

        req.getValidationResult().then(function(result) {

            if (result.isEmpty() == false) {
                console.log(result.array())
                return next(new Error("Error in params!"));
            }

            doWork(req,res,next);

        });

    };


    function doWork(req, res, next) {

        userModel.findAll({name : req.param.name}, function (err, result) {

            if (err) {
                return next(err);
            }

            var users = [];

            for (var i = 0; i < result.length; i++) {
                users.push({
                    id: result[i].id,
                    text: result[i].name + " (" + result[i].email + ")",
                    name: result[i].name
                });
            }

            res.tpl.users = users;

            return next();
        })
    }

};
