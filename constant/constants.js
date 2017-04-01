/**
 * Created by Resi Tamas on 2017-03-17.
 */

var sports = [
    'Football', 'Basketball', 'Ice Hockey'
]

var levels = [
    'Beginner', 'Professional'
]

var sexes = [
    'men', 'women'
]

function years() {

    var years = [];

    var now = new Date().getFullYear();

    for (var i = now - 80; i < now - 10; i++) {
        years.push(i)
    }

    return years;
}

var types = [
    'Private', 'Public'
]

module.exports.sports = sports;
module.exports.levels = levels;
module.exports.sexes = sexes;
module.exports.years = years;
module.exports.types = types;