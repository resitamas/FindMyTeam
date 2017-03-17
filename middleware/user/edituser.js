/**
 * Created by Resi Tamas on 2017-03-15.
 */

var requireOption = require('../requireoption').requireOption;
var sexes = require('../../constant/constants').sexes;
var years = require('../../constant/constants').years;

/**
 * Edit user
 */
module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository , 'userModel');

    return function (req, res, next) {

        var body = req.body;

        if(Object.keys(body).length === 0 && body.constructor === Object) {
            return next();
        }

        req.checkParams("id",'Add id').isInt();
        req.checkBody("sex",'Choose sex').isOneOfThem(sexes);
        req.checkBody("year",'Choose year').isOneOfThem(years());
        req.checkBody("description",'Enter description').notEmpty();
        req.checkBody("sports",'Sports should be array').isArray();

        req.getValidationResult().then(function(result) {

            if (result.isEmpty() == false) {
                return next();
            }

            doWork(req,res,next);

        });

    };

    function doWork(req, res, next) {

        userModel.findOne({id : req.param.id}, function (err, result) {

            if (err) {
                return next(err);
            }

            result.sex = req.body.sex;
            result.birthyear = req.body.year;
            result.description = req.body.description;
            result.sports = req.body.sports;

            console.log(req.body);

            res.tpl.user = result;

            res.redirect("/users/"+result.id);
        });

    }
    
};