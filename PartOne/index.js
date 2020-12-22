'use strict';

const fs = require('fs');

/**
 * A note on the philosophy of how I develop:
 * I know there are ways to condense a lot of these expressions
 * but I tend to value readability over condensibility so long as
 * it does not mean sacrificing efficiency
 */

/**
 * Gets the inputs for changes in freq
 */
const getFrequencies = () => {
    return JSON.parse(fs.readFileSync('./inputs.json', 'utf-8'));
}


/**
 * Calculates the end frequency after iterate through {frequcyArray} 
 * @param {Array} frequencyArray - Iterates through this array of frequencies
 * @param {Number} startingPos - The starting position
 */
const getEndFrequency = async (frequencyArray, startingPos = 0) => {
    var currentFrequency = startingPos || 0;
    for (var nextFreq of frequencyArray){
        currentFrequency += parseInt(nextFreq);
    }

    return currentFrequency;
}





module.exports = {
    getEndFrequency: getEndFrequency,
    getFrequencies: getFrequencies
}