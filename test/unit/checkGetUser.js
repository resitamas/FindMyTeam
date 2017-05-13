/**
 * Created by Resi Tamas on 13/05/2017.
 */

var expect = require('chai').expect;
var getUserMW = require('../../middleware/user/getuser');


describe('getUser middleware', function () {

    it('no id paramter is given', function (done) {

        //Mock
        var fakeUserModel = {
            userModel: {}
        };

        var res = {};

        var req = {
            checkParams: function (key, desc) {
                    return fakeValidator;
            },
            getValidationResult: function () {
                return mockResult;
            }
        };

        var fakeValidator = {
            notEmpty: function () {
                return false;
            }
        };

        var mockResult = {
            then: function (cb) {
                return cb(result)
            }
        };

        var result = {
            isEmpty: function () {
                return false;
            }
        };

        //Test
        getUserMW(fakeUserModel)(req,res,function (err) {

            expect(err).to.be.an.instanceof(Error);
            done();

        });


    });

    it('no user found', function (done) {

        //Mock
        var fakeUserModel = {
            userModel: {
                findOne: function (some, cb) {
                    return cb({},{});
                }
            }
        };

        var res = {};

        var req = {
            checkParams: function (key, desc) {
                return fakeValidator;
            },
            getValidationResult: function () {
                return mockResult;
            },
            params: {
                id: 1
            }
        };

        var fakeValidator = {
            notEmpty: function () {
                return true;
            }
        };

        var mockResult = {
            then: function (cb) {
                return cb(result)
            }
        };

        var result = {
            isEmpty: function () {
                return true;
            }
        }

        //Test
        getUserMW(fakeUserModel)(req,res,function (err) {

            expect(err).to.exist;
            done();

        });


    });

    it('user is found', function (done) {

        //Mock
        var fakeUserModel = {
            userModel: {
                findOne: function (some, cb) {
                    return cb(undefined,fakeUser);
                }
            }
        };

        var fakeUser = {
            user: {
                name: "Username"
            }
        };

        var res = {

            tpl: {

            }

        };

        var req = {
            checkParams: function (key, desc) {
                return fakeValidator;
            },
            getValidationResult: function () {
                return mockResult;
            },
            params: {
                id: 1
            }
        };

        var fakeValidator = {
            notEmpty: function () {
                return true;
            }
        };

        var mockResult = {
            then: function (cb) {
                return cb(result)
            }
        };

        var result = {
            isEmpty: function () {
                return true;
            }
        };

        //Test
        getUserMW(fakeUserModel)(req,res,function (err) {

            expect(err).to.not.exist;
            expect(res.tpl.user).to.eql(fakeUser);
            done();

        });

    });

});