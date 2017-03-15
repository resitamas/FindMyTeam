/**
 * Created by Resi Tamas on 2017-03-14.
 */

var renderMW = require('../middleware/render');

module.exports = function (app) {

    /**
     * Send invitation to player
     */
    // app.post('/invite',function (req, res) {
    //     res.redirect("/games/edit/1")
    // });

    /**
     * Send request to game
     */
    app.post('/request',function (req, res) {
        res.redirect("/games/1")
    });

    /**
     * Join to game
     */
    app.post('/join',function (req, res) {
        res.redirect("/games/1")
    });

    /**
     * Refuse to join game
     */
    app.post('/refuse',function (req, res) {
        res.redirect("/games/1")
    });

}
