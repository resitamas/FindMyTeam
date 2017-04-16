/**
 * Created by Resi Tamas on 2017-03-14.
 */


var renderEJSMW = require('../middleware/renderEJS');
var authMW = require('../middleware/authentication/authMW');
var createGameMW = require('../middleware/game/creategame');
var getGamesMW = require('../middleware/game/getgames');
var getGameMW = require('../middleware/game/getgame');
var updateGameMW = require('../middleware/game/updategame');
var deleteGameMW = require('../middleware/game/deletegame');
var getMyGames = require('../middleware/game/getmygames');
var checkEditGame = require('../middleware/authorization/checkeditgame');
var checkGameVisibilityMW = require('../middleware/game/checkgamevisibility');
var checkGamesVisibilityMW = require('../middleware/game/checkgamevisibilities');

var gameModel = require('../models/game');
var userModel = require('../models/user');

var path = require("path");

module.exports = function  (app) {

    var objectRepository = {
        gameModel: gameModel,
        userModel: userModel
    };

    /**
     * Main page
     */
    app.get(["/","/index"],
        authMW(objectRepository),
        getMyGames(objectRepository),
        renderEJSMW(objectRepository,"index.ejs")
    );

    /**
     * Search games page
     */
    app.get('/games',
        authMW(objectRepository),
        getGamesMW(objectRepository),
        checkGamesVisibilityMW(objectRepository),
        renderEJSMW(objectRepository,"games.ejs")
    );

    /**
     * Edit game
     */
    app.use('/games/edit/:id',
        authMW(objectRepository),
        getGameMW(objectRepository, false),
        checkEditGame(objectRepository),
        updateGameMW(objectRepository),
        renderEJSMW(objectRepository,"create.ejs")

    );

    /**
     * Create game
     */
    app.use('/games/new',
        authMW(objectRepository),
        createGameMW(objectRepository),
        renderEJSMW(objectRepository,"create.ejs")
    );

    /**
     * Delete game
     */
    app.post('/games/delete',
        getGameMW(objectRepository, false),
        checkEditGame(objectRepository),
        deleteGameMW(objectRepository)
    );

    /**
     * Game information page
     */
    app.get('/games/:id',
        authMW(objectRepository),
        getGameMW(objectRepository, true),
        checkGameVisibilityMW(objectRepository),
        renderEJSMW(objectRepository,"game.ejs")
    );

};