/**
 * Created by Resi Tamas on 2017-03-14.
 */

var authMW = require('../middleware/authentication/authMW');
var getGameMW = require('../middleware/game/getgame');
var renderMW = require('../middleware/render');
var changeStatusWithGameMW = require('../middleware/application/changestatuswithgame');
var checkGame = require('../middleware/authorization/checkgame');
var checkRequestMW = require('../middleware/application/checkcanrequest');

var gameModel = require('../models/gameModel');

module.exports = function (app) {

    var objectRepository = {
        gameModel: new gameModel()
    };

    /**
     * Send request to game
     */
    app.post('/request',
        authMW(objectRepository),
        getGameMW(objectRepository),
        checkRequestMW(objectRepository),
        changeStatusWithGameMW(objectRepository,undefined,"requested")
    );

    /**
     * Play a game
     */
    app.post('/play',
        authMW(objectRepository),
        getGameMW(objectRepository),
        checkGame(objectRepository,["invited"]),
        changeStatusWithGameMW(objectRepository,["invited"],"players")
    );

    /**
     * Not play a game
     */
    app.post('/notplay',
        authMW(objectRepository),
        getGameMW(objectRepository),
        checkGame(objectRepository,["players"]),
        changeStatusWithGameMW(objectRepository,["players"], "invited")
    );

    /**
     * Refuse an invitation
     */
    app.post('/refuse',
        authMW(objectRepository),
        getGameMW(objectRepository),
        checkGame(objectRepository,["invited","requested"]),
        changeStatusWithGameMW(objectRepository, ["invited", "requested"])
    );

};
