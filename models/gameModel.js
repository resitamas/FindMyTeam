/**
 * Created by Resi Tamas on 2017-03-14.
 */

/**
 * Game model (mock)
 * @constructor
 */
var Game = function () {
};

/**
 * An instance
 */
var GameInstanceMock = {
    id: 1,
    organizer: 1,
    sport: 'Football',
    date: '2017.04.04.',
    time: '2016',
    level : 'beginner',
    description: 'Come Come Come',
    maxplayers: 10,
    loaction: 'Budapest, 1111, Valahol utca 1',
    type: "private",
    players: [1,1,1],
    invited: [1],
    requested: [1]
};

/**
 * Find one element with the criteria
 * @param criteria
 * @param cb error first callback
 * @returns {*}
 */
Game.prototype.findOne = function (criteria, cb) {

    //returns 1 mocked item
    return cb(null, GameInstanceMock);
};

/**
 * Find my games with the criteria
 * @param criteria
 * @param cb error first callback
 * @returns {*}
 */
Game.prototype.myGames = function (criteria, cb) {

    var games = {
        organized: [GameInstanceMock],
        participated: [GameInstanceMock],
        requested: [GameInstanceMock],
        invited: [GameInstanceMock]
    };

    return cb(null,games);
};

/**
 * Find my games with the criteria
 * @param criteria
 * @param cb error first callback
 * @returns {*}
 */
Game.prototype.findGames = function (criteria, cb) {

    var games = [GameInstanceMock, GameInstanceMock, GameInstanceMock];

    return cb(null,games);
};


/**
 * Save the item to the db
 * @param cb error first callback
 * @returns {*}
 */
Game.prototype.save = function (cb) {
    return cb(null, this);
};

/**
 * Delete item from db
 * @param cb error first callback
 * @returns {*}
 */
Game.prototype.delete = function (id, cb) {
    return cb(null, id);
};

module.exports = Game;
