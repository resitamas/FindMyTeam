/**
 * Created by Resi Tamas on 13/05/2017.
 */

var expect = require('chai').expect;
var checkGameMW = require('../../middleware/authorization/checkgame');

describe('checkGame middleware', function () {

    it('game is missing', function () {

        //Mock
        var res = {
            tpl: {
                game: "undefined"
            }
        };

        var req = {

        };

        checkGameMW({},{})( req, res, function (err) {

            expect(err).to.exist;

        });


    });

    it('user owns the game', function () {

        //Mock
        var res = {
            tpl: {
                game: {
                    organizer: {
                        _id: 1
                    }
                }
            }
        };

        var req = {
            session: {
                userid: 1
            }
        };

        checkGameMW({},{})( req, res, function (err) {

            expect(res.tpl.game).to.exist;
            expect(err).to.eql(undefined);

        });


    });


    it('user can play the game', function (done) {

        //Mock
        var res = {
            tpl: {
                game: {
                    organizer: {
                        _id: 2
                    },
                    inviteids: [{
                        _id: 1
                    }]
                }
            }
        };

        var req = {
            session: {
                userid: 1
            }
        };

        var keys = ["inviteids"];

        checkGameMW({},keys)( req, res, function (err) {

            expect(err).to.eql(undefined);
            done();

        });


    });

    it('user cannot play the game', function (done) {

        //Mock
        var res = {
            tpl: {
                game: {
                    organizer: {
                        _id: 2
                    },
                    inviteids: [{
                        _id: 3
                    }]
                }
            }
        };

        var req = {
            session: {
                userid: 1
            }
        };

        var keys = ["inviteids"];

        checkGameMW({},keys)( req, res, function (err) {

            expect(err).to.be.an.instanceof(Error);
            done();

        });


    });
    

});
