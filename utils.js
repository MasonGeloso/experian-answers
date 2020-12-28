'use strict';



/**
 * Just to be safe that we don't assign a reference, we can deepcopy the 
 * data into a new memory address
 * @param {any} val - any value you'd like to deepcopy
 */
const deepCopy = (val) => {return JSON.parse(JSON.stringify(val))};

/**
 * Takes an in an object { obj } and filters by a 
 * @param {Object} obj The object you'd like to filter
 * @param {Function} predicate The filter function you'd like to apply
 */
const filterObject = (obj, predicate) => {
    return Object.keys(obj)
            .filter( key => predicate(obj[key]) )
            .reduce( (newObj, key) => (newObj[key] = obj[key], newObj), {} )
}


module.exports = {
    deepCopy: deepCopy,
    filterObject: filterObject
}