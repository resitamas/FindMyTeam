/**
 * Created by Resi Tamas on 2017-03-14.
 */

var authMW = require('../middleware/authentication/authMW');
var renderMW = require('../middleware/render');
var joinMW = require('../middleware/application/join');
var refuseMW = require('../middleware/application/refuse');
var requestMW = require('../middleware/application/request');

module.exports = function (app) {

    var objectRepository = {

    };

    /**
     * Send request to game
     */
    app.post('/request',
        authMW(objectRepository),
        requestMW(objectRepository)
    );

    /**
     * Join to game
     */
    app.post('/join',
        authMW(objectRepository),
        joinMW(objectRepository)
    );

    /**
     * Refuse to join game
     */
    app.post('/refuse',
        authMW(objectRepository),
        refuseMW(objectRepository)
    );

};
