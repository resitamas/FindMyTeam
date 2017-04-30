/**
 * Created by Resi Tamas on 10/04/2017.
 */

var schema = require('mongoose').Schema;
var db = require('../config/db');

var User = db.model('User', {
    name: String,
    email: String,
    password: String,
    birthyear: String,
    sex: String,
    description: String,
    avatarextension: String,
    sports: {
        type: Array
    }
});

module.exports = User;
