/**
 * Created by Resi Tamas on 10/04/2017.
 */

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/findmyteam');

module.exports = mongoose;
