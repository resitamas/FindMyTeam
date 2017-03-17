/**
 * Created by Resi Tamas on 2017-03-14.
 */

/**
 * User model (mock)
 * @constructor
 */
var User = function () {
};

/**
 * An instance
 */
var UserInstanceMock = {
    id: 1,
    name: 'Rési Tamás',
    email: 'email@gmail.com',
    password: 'asd',
    birthyear: '2016',
    sex : 'men',
    description: 'I like sport',
    sports: ['Football','Ice Hockey']
};

/**
 * Find one element with the criteria
 * @param criteria
 * @param cb error first callback
 * @returns {*}
 */
User.prototype.findOne = function (criteria, cb) {

    //returns 1 mocked item
    return cb(null, UserInstanceMock);
};

/**
 * Save the item to the db
 * @param cb error first callback
 * @returns {*}
 */
User.prototype.save = function (cb) {
    return cb(null, this);
};

module.exports = User;