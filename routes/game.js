/**
 * Created by Resi Tamas on 2017-03-14.
 */

var renderMW = require('../middleware/render');
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

var gameModel = require('../models/gameModel');

var path = require("path");

module.exports = function  (app, dirname) {

    var objectRepository = {
        gameModel: new gameModel()
    };

    /**
     * Main page
     */
    app.get(["/","/index"],
        authMW(objectRepository),
        getMyGames(objectRepository),
        renderMW(objectRepository,path.join(dirname+'/public/index.html'))
    );

    /**
     * Search games page
     */
    app.get('/games',
        authMW(objectRepository),
        getGamesMW(objectRepository),
        checkGamesVisibilityMW(objectRepository),
        renderMW(objectRepository,path.join(dirname+'/public/games.html'))
    );

    /**
     * Edit game
     */
    app.use('/games/edit/:id',
        authMW(objectRepository),
        getGameMW(objectRepository),
        checkEditGame(objectRepository),
        updateGameMW(objectRepository),
        renderMW(objectRepository,path.join(dirname+'/public/create.html'))
    );

    /**
     * Create game
     */
    app.use('/games/new',
        authMW(objectRepository),
        createGameMW(objectRepository),
        renderMW(objectRepository,path.join(dirname+'/public/create.html'))
    );

    /**
     * Delete game
     */
    app.post('/games/delete',
        getGameMW(objectRepository),
        checkEditGame(objectRepository),
        deleteGameMW(objectRepository)
    );

    /**
     * Game information page
     */
    app.get('/games/:id',
        authMW(objectRepository),
        getGameMW(objectRepository),
        checkGameVisibilityMW(objectRepository),
        renderMW(objectRepository,path.join(dirname+'/public/detailedgame.html'))
    );

};