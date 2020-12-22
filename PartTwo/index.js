'use strict';

const fs = require('fs');

/**
 * A note on the philosophy of how I develop:
 * I know there are ways to condense a lot of these expressions
 * but I tend to value readability over condensibility so long as
 * it does not mean sacrificing efficiency
 */

// Use set instead of list to keep it O(1)
// That's right, I write efficient code
const knownFrequencies = new Set();

/**
 * Just to be safe that we don't assign a reference, we can deepcopy the 
 * data into a new memory address
 * @param {any} val - any value you'd like to deepcopy
 */
const deepCopy = (val) => {return JSON.parse(JSON.stringify(val))};


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

        // Could be ternary, but not as readable
        if (knownFrequencies.has(currentFrequency)){

            // Reset knownFrequencies
            knownFrequencies.clear();
            return {
                currentFrequency: currentFrequency,
                foundRepeat: true
            }
        } else {
            knownFrequencies.add(deepCopy(currentFrequency))
        }
    }

    return {
        currentFrequency: currentFrequency,
        foundRepeat: false
    };
}


/**
 * find the frequency of the first repeating frequency change
 * @param {Array} frequencyArray - The frequency array to query
 */
const getRepeatingFrequency = async (frequencyArray) => {
    var repeatedFrequency = null;
    var startingPos = 0;

    while (!repeatedFrequency){
        
        const resp = await getEndFrequency(frequencyArray, startingPos);

        if (!resp.foundRepeat){
            startingPos = resp.currentFrequency
            continue
        } else {
            return resp.currentFrequency
        }
    }
}

module.exports = {
    getEndFrequency: getEndFrequency,
    getFrequencies: getFrequencies,
    getRepeatingFrequency: getRepeatingFrequency
}