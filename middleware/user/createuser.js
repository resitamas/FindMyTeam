/**
 * Created by Resi Tamas on 2017-03-15.
 */

/**
 * Create user
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {

        req.checkBody("username",'Enter username').notEmpty();
        req.checkBody("email",'Enter valid e-mail').isEmail();
        req.checkBody("password",'Enter password').notEmpty();
        req.checkBody("confirm",'Enter confirmation').notEmpty();
        req.checkBody("sex",'Choose sex').isOneOfThem(["men","women"]);
        req.checkBody("birthyear").isOneOfThem(["2014","2015","2016"]);
        req.checkBody("description").notEmpty();

        req.getValidationResult().then(function(result) {

            if (result.isEmpty() == false) {
                console.log(result.array());
                return next();
            }

            doWork(req,res,next);

        });
    };


    function doWork(req, res, next) {


        //TODO: Create user


        req.session.userid = 1;
        res.redirect('/');

    }

};
