/**
 * Created by Resi Tamas on 2017-03-14.
 */

var renderMW = require('../middleware/render');

var gameModel = require('../models/gameModel');

var path = require("path");

module.exports = function  (app, dirname) {

    var objectRepository = {
        gameModel: gameModel
    };

    /**
     * Search games page
     */
    app.get('/games',
        renderMW(objectRepository,path.join(dirname+'/public/games.html'))
    );

    /**
     * Game information page
     */
    app.get('/games/:id',
        renderMW(objectRepository,path.join(dirname+'/public/detailedgame.html'))
    );

    /**
     * Edit game information page
     */
    app.get('/games/edit/:id',
        renderMW(objectRepository,path.join(dirname+'/public/create.html'))
    );

    /**
     * Create game page
     */
    app.get('/new/games',
        renderMW(objectRepository,path.join(dirname+'/public/create.html'))
    );

    /**
     * Save edited game
     */
    app.post('/games/edit/:id', function (req, res) {

    })

    /**
     * Create game
     */
    app.post('/games/new',function (req, res) {
        res.redirect("/games/1");
    });

    /**
     * Delete game
     */
    app.post('/games/delete',function (req,res) {
        res.redirect("/index");
    });

    /**
     * Main page
     */
    app.get(["/","/index"],
        renderMW(objectRepository,path.join(dirname+'/public/index.html'))
    );

};