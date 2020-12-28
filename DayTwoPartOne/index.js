'use strict';

const fs = require('fs');


const getInputs = () => {
    return JSON.parse(fs.readFileSync('./input.json'));
}


/**
 * Generates a check sum for later data verification
 * @param {Array} boxIds - inputted array of box ids
 * @returns {Number} - the valid checksum
 */
const generateCheckSum = (boxIds) => {

    let twoCounts = 0;
    let threeCounts = 0;

    boxIds.map(boxId => {
        let foundTwoWordCheck = false;
        let foundThreeWordCheck = false;
    
        for (var char of boxId.split('')){
            let matches = (boxId.match(RegExp(char, 'g'), boxId) || []).length;
    
            if (matches == 2 && !foundTwoWordCheck){
                twoCounts += 1;
                foundTwoWordCheck = true;
            }
    
            if (matches == 3 && !foundThreeWordCheck){
                threeCounts += 1;
                foundThreeWordCheck = true;
            }
        }
    });

    return twoCounts*threeCounts;
}



module.exports = {
    generateCheckSum: generateCheckSum,
    getInputs: getInputs
}