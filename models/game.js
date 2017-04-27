/**
 * Created by Resi Tamas on 10/04/2017.
 */

var Schema = require('mongoose').Schema;
var db = require('../config/db');

var gameSchema = new Schema(
    {
        organizer: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        sport: String,
        date: String,
        time: String,
        level: String,
        description: String,
        maxplayers: Number,
        location: String,
        visibility: String,
        playerids: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        inviteids: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        requestids: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    }
)

// gameSchema.statics.myGames = function (criteria, cb) {
//
//     var games = {
//         organized: [],
//         participates: [],
//         requests: [],
//         invites: []
//     };
//
//     cb(null, games)
// }

var Game = db.model('Game', gameSchema);

module.exports = Game;


