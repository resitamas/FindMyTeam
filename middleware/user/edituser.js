/**
 * Created by Resi Tamas on 2017-03-15.
 */

var requireOption = require('../requireoption').requireOption;
var sexes = require('../../constant/constants').sexes;
var years = require('../../constant/constants').years;
var path = require('path');

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

        req.checkParams("id",'Add id').notEmpty();
        req.checkBody("sex",'Choose sex').isOneOfThem(sexes);
        req.checkBody("birth year",'Choose year').isOneOfThem(years());
        req.checkBody("description",'Enter description').notEmpty();
        // req.checkBody("sports",'Sports should be array').isArray();

        req.getValidationResult().then(function(result) {

            console.log(req.body);

            if (result.isEmpty() == false) {
                console.log(result.array());
                return next();
            }

            doWork(req,res,next);

        });

    };

    function doWork(req, res, next) {

        userModel.findOne({_id : req.params.id}, function (err, result) {

            if (err) {
                return next(err);
            }

            if (req.files && req.files.avatar) {

                var file = req.files.avatar;

                var extension = file.name.split('.')[1];

                file.mv(path.join(__dirname,'../../public/images', req.session.userid + '.' + file.name.split('.')[1]), function (err) {

                    if (err) {
                        return next(err);
                    }

                    result.avatarextension = '.' + extension;

                    save(req, res, result);

                })

            } else {
                save(req, res, result);
            }

        });

    }

    function save(req, res, result) {

        result.sex = req.body.sex;
        result.birthyear = req.body["birth year"];
        result.description = req.body.description;
        result.sports = req.body["sports"];

        result.save(function (err) {

            if (err) {
                return next(err);
            }

            res.tpl.user = result;

            res.redirect("/users/"+result.id);

        });

    }

    
};