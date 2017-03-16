/**
 * Created by Resi Tamas on 2017-03-16.
 */

/**
 * Load a dependency from an object repository
 * @param objectRepository object repository
 * @param propertyName dependency name
 * @returns {*}
 */
function requireOption(objectRepository, propertyName) {
    if (objectRepository && objectRepository[propertyName]) {
        return objectRepository[propertyName];
    }
    throw new TypeError(propertyName + ' required');
}

module.exports.requireOption = requireOption;
