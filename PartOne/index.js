const fs = require('fs');

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
        if (nextFreq.startsWith('+')){
            currentFrequency += parseInt(nextFreq.replace(/\+/g, ''));
        } else {
            currentFrequency -= parseInt(nextFreq.replace(/\-/g, ''));
        }
    }

    return currentFrequency;
}

module.exports = {
    getEndFrequency: getEndFrequency,
    getFrequencies: getFrequencies
}