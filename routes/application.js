/**
 * Created by Resi Tamas on 2017-03-14.
 */

var authMW = require('../middleware/authentication/authMW');
var getGameMW = require('../middleware/game/getgame');
var changeStatusWithGameMW = require('../middleware/application/changestatuswithgame');
var checkGame = require('../middleware/authorization/checkgame');
var checkRequestMW = require('../middleware/application/checkcanrequest');

var gameModel = require('../models/game');
var userModel = require('../models/user');

module.exports = function (app) {

    var objectRepository = {
        gameModel: gameModel,
        userModel: userModel
    };

    /**
     * Send request to game
     */
    app.post('/request',
        authMW(objectRepository),
        getGameMW(objectRepository),
        checkRequestMW(objectRepository),
        changeStatusWithGameMW(objectRepository,undefined,"requestids")
    );

    /**
     * Play a game
     */
    app.post('/play',
        authMW(objectRepository),
        getGameMW(objectRepository),
        checkGame(objectRepository,["inviteids"]),
        changeStatusWithGameMW(objectRepository,["inviteids"],"playerids")
    );

    /**
     * Not play a game
     */
    app.post('/notplay',
        authMW(objectRepository),
        getGameMW(objectRepository),
        checkGame(objectRepository,["playerids"]),
        changeStatusWithGameMW(objectRepository,["playerids"], "inviteids")
    );

    /**
     * Refuse an invitation
     */
    app.post('/refuse',
        authMW(objectRepository),
        getGameMW(objectRepository),
        checkGame(objectRepository,["inviteids","requestids"]),
        changeStatusWithGameMW(objectRepository, ["inviteids", "requestids"])
    );

};
