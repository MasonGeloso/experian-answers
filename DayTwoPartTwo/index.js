'use strict';

const fs = require('fs');
const path = require('path');

const { deepCopy } = require('../utils');


/**
 * @returns {Array} - Provided inputs from adventofcode.com
 */
const getInputs = () => {
    return JSON.parse(fs.readFileSync(
        path.join(process.cwd(), 'DayTwoPartTwo', 'input.json'), 'utf-8')
    );
}


/**
 * Generates a check sum for later data verification
 * @param {Array} boxIds - inputted array of box ids
 * @returns {Number} - the valid checksum
 */
const generateCheckSum = (boxIds) => {

    let twoCounts = 0;
    let threeCounts = 0;

    // Will map through each boxId and count the amount of twoCounts and 
    // threeCounts in the boxId. Once that is finished, it will multiply
    // and return the twoCount and threeCount 
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


/**
 * Will check if a give {boxId} has a match with any index of boxIds within
 * one character difference.
 * @param {String} boxId - the box id of the box you're finding a match for
 * @param {Array} BoxIds - Box ids to compare the given {boxId} with
 */
const checkForMatch = (boxId, boxIds) => {
    let boxIdChar = boxId.split('');
    for (const c in boxIdChar){
        const char = parseInt(c);
        const newBoxId = deepCopy(boxIdChar);
        newBoxId[char] = '\\w';

        for (const checkBoxId of boxIds){
            if (boxId == checkBoxId){
                continue
            }

            let matches = checkBoxId.match(RegExp(newBoxId.join('')));
            if (matches){
                return checkBoxId.slice(0, char) + checkBoxId.slice(char + 1);
            }
        }
    }
}



/**
 * Will get the related box id within the threshold on 1 different character.
 * WARNING: This is a O(n^2) so be careful with the amount of inputs
 * @param {Array} boxIds - The array of box ids
 * @returns {Number} related box ID
 */
const getRelatedBoxes = (boxIds) => {
    let resp = null;
    for (let boxId of boxIds){
        if (resp = checkForMatch(boxId, boxIds)){
            return resp
        }
    }
}



module.exports = {
    getRelatedBoxes: getRelatedBoxes,
    getInputs: getInputs,
    generateCheckSum: generateCheckSum
}