/**
 * Created by Resi Tamas on 2017-03-15.
 */

/**
 * Login
 *  -validate body
 *  -login user and redirect to main page
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {

        req.checkBody("username",'Enter username').notEmpty();
        req.checkBody("password",'Enter password').notEmpty();

        req.getValidationResult().then(function(result) {

            if (result.isEmpty() == false) {
                return next();
            }

            doWork(req,res,next);

        });
    };
    
    function doWork(req, res, next) {

        //TODO: Check if user exists

        req.session.userid = 1;
        res.redirect('/');

    }
    
};
