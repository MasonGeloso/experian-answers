'use strict';

const fs = require('fs');
const path = require('path');

const { filterObject } = require('../utils');


/**
 * @class Fabric
 * 
 * @description Making this a class isn't necessarily needed but I'd like to 
 * show the fact that I can work with class objects and develop
 * module code
 * 
 * @property {Boolean} wrap - If set true, will wrap around fabric if it cuts
 *    past the right boarder
 * @property {Object} mappedClaims - A map of our fabric ids in relation to 
 *    currently mapped claims
 * @property {Number} height - Height of the fabric in inches
 * @property {Number} width - Width of the fabric in inches
 * @property {Array} leftBoarder - Array in order of left boarder of fabric
 * @property {Array} topBoarder - Array in order of top boarder of fabric
 * 
 * @method convertClaimStrings - Converts claim string to claim Id object
 * @method translateAndMapClaim - Converts and maps claim ID to array of
 *     mapped Ids
 * @method translateAndMapClaims -  Will translate and map each claim within
 *    a provide array of claim objects or strings. If the claim is a string,
 *    it will be automatically converted to claimId object.
 * @method calculateOverlap - Filters all currently mapped claim ids for
 *    overlapped areas
 * @method reset - Resets mappedClaimIds constant
 */
class Fabric {
    constructor(width, height, wrap = false) {

        this.wrap = wrap || false;

        this.height = height;
        this.width = width;
        this.leftBoarder = [];
        this.topBoarder = [];

        // Calculate our left boarder
        var i = this.height; while (i--) {
            if (i == (this.height - 1)) {
                this.leftBoarder.push(1);
            } else {
                this.leftBoarder.push(
                    (this.leftBoarder[this.leftBoarder.length - 1] || 1)
                    + this.width)
            }
        }

        // Calculate our top boarder
        var i = this.width; var ind = 0; while (i--) {
            ind += 1;
            this.topBoarder.push(ind);
        }

        this.mappedClaims = {};
        this.claims = {};
    }

    /**
     * Converts claim string to claim Id object
     * @param {String} provided claim string. See example
     * @example "#4 @ 619,976: 20x15"
     * 
     * @returns {Object} claim id object
     * @example {id: 1, width: 4, height: 4, distanceFromTop: 3,
     *             distanceFromBottom: 5}
     */
    convertClaimStrings = async (claimString) => {
        return {
            id: parseInt(claimString.substring(
                1, claimString.indexOf(' @ '))),
            width: parseInt(claimString.substring(
                claimString.indexOf(': ') + 2, claimString.indexOf('x'))),
            height: parseInt(claimString.substring(
                claimString.indexOf('x') + 1)),
            distanceFromTop: parseInt(claimString.substring(
                claimString.indexOf(',') + 1, claimString.indexOf(':'))),
            distanceFromLeft: parseInt(claimString.substring(
                claimString.indexOf('@ ') + 2, claimString.indexOf(',')))
        }
    }

    /**
     * Converts claim ID to array of mapped Ids
     * 
     * Sidenote about how it calculates claims. Essentially every inch available is
     * assigned an ID based on the total amount of area. So for example a 10x10 
     * fabric piece would look like this:
     *   1  2  3  4  5  6  7  8  9  10
     *   11 12 13 14 15 16 17 18 19 20
     *   21 22 23 24 25 26 27 28 29 30
     *   31 32 33 34 35 36 37 38 39 40
     *   41 42 43 44 45 46 47 48 49 50
     *   51 52 53 54 55 56 57 58 59 60
     *   61 62 63 64 65 66 67 68 69 70
     *   71 72 73 74 75 76 77 78 79 80
     *   81 82 83 84 85 86 87 88 89 90
     *   91 92 93 94 95 96 97 98 99 100
     * 
     * the each claim ID is converted into an array of claimed inches.
     * so for example the claimId of:
     *  3,2 3x3 == [24, 25, 26, 34, 35, 36, 44, 45, 46]
     * 
     * I know this probably isn't the fastest approach but it allows 
     * more utility and functionality. For example, if you needed to 
     * make this visible on a frontend app, you can easily convert 
     * claim ids to a visual graph.
     */
    translateAndMapClaim = async (claim) => {

        typeof claim == 'string'
            ? claim = await this.convertClaimStrings(claim)
            : claim = claim

        /**
         * I know.. double for loop O(n^2) but only so much time
         * TODO: Implement a better more efficient way to iterate through rows
         */
        for (let currentRow = 0; currentRow < claim.height; currentRow++) {
            for (let i = 0; i < claim.width; i++) {
                const id = this.leftBoarder[claim.distanceFromTop + currentRow]
                    + claim.distanceFromLeft + i;

                if (this.wrap
                    && id === this.leftBoarder[claim.distanceFromTop + 1]) {

                    /**
                     * If the claim wraps and wrapping is disabled, it will
                     * break. If wrapping is enabled, it will move to next
                     * line - Just putting this here just incase
                     */
                    break;
                } else {

                    /**
                     * If the index of the mappedClaim doesn't exist, it will
                     * create one. Otherwise it will append it to the 
                     * mappedClaim
                     * 
                     * If index does exist, the claimId will be marked as not
                     * clean. This means it possess overlap with another claim
                     */

                    this.claims[claim.id] === undefined ?
                        this.claims[claim.id] = {} : {}

                    if (this.mappedClaims[id] === undefined) {
                        this.mappedClaims[id] = [claim.id]
                        this.claims[claim.id]['clean'] != false ?
                            this.claims[claim.id]['clean'] = true : {}
                    } else {
                        this.mappedClaims[id].push(claim.id)

                        this.mappedClaims[id].map(overlappedClaim => {
                            this.claims[overlappedClaim]['clean'] = false
                        })
                    }
                }
            }
        }
    }

    /**
     * Will translate and map each claim within a provide array of claim
     * objects or strings. If the claim is a string, it will be automatically
     * converted to claimId object
     * @param {Array} claims - array of claims
     * @returns {Object} - Object of mapped claims
     */
    translateAndMapClaims = async (claims) => {
        claims.map(claim => {
            this.translateAndMapClaim(claim);
        });

        return this.mappedClaims
    }

    /**
     * Filters all currently mapped claim ids for overlapped areas
     * @returns { Object } overlapping fabric ids
     * @example { '53': [1, 2] }
     */
    calculateOverlap = async () => {
        return filterObject(this.mappedClaims, claim => claim.length > 1)
    }


    /**
     * Outputs a stringed viewable version of the fabric
     * @param {Boolean} htmlView - If true, will render for HTML page
     */
    view = (htmlView) => {
        var htmlView = htmlView || false;
        let height = this.height;
        let count = 1;
        let viewString = '';

        while (height--) {
            let width = this.width;
            while (width--) {
                if (!(this.mappedClaims[count])) {
                    htmlView ?
                        viewString += (
                            `<p style="display: inline">
                            &nbsp;&nbsp;.&nbsp;&nbsp;</p>`
                        ) :
                        viewString += ' . ';
                } else if (this.mappedClaims[count].length > 1) {
                    htmlView ?
                        viewString += (
                            '<p style="display: inline">' +
                            '&nbsp;&nbsp;X&nbsp;&nbsp;</p>'
                        ) :
                        viewString += ' X ';
                } else if (this.mappedClaims[count].length == 1) {
                    htmlView ?
                        viewString += (
                            `<p style="display: inline">
                        &nbsp;${this.mappedClaims[count][0]}
                        &nbsp;</p>`
                        ) :
                        viewString += ` ${this.mappedClaims[count][0]} `;
                }
                count += 1;
            }
            htmlView ? viewString += "<br>" : viewString += '\n';
        }

        return viewString
    }

    getCleanClaims = async () => {

        const cleanClaims = Object.keys(filterObject(
            this.claims, claim => claim.clean == true));

        return [...new Set(cleanClaims)]
    }

    /**
     * Resets mappedClaims
     * @returns {null}
     */
    reset = () => {
        this.mappedClaims = {};
        this.claims = {};
    }
}


/**
 * Reads in inputs from ./input.json and parses inputs to usable
 * claim objects. If format of claim input is incorrect, it cannot
 * parse it correctly
 * @returns {Array} array of claim ID objects
 * @example
 *  [{id: 1, width: 4, height: 4, distanceFromTop: 3, distanceFromBottom: 5}]
 */
const getInputs = () => {
    const inputs = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), 'DayThreePartTwo', 'input.json'), 'utf-8')
    )

    return inputs.map(inp => {
        return {
            id: parseInt(inp.substring(
                1, inp.indexOf(' @ '))),
            width: parseInt(inp.substring(
                inp.indexOf(': ') + 2, inp.indexOf('x'))),
            height: parseInt(inp.substring(
                inp.indexOf('x') + 1)),
            distanceFromTop: parseInt(inp.substring(
                inp.indexOf(',') + 1, inp.indexOf(':'))),
            distanceFromLeft: parseInt(inp.substring(
                inp.indexOf('@ ') + 2, inp.indexOf(',')))
        }
    });
}

module.exports = {
    getInputs: getInputs,
    Fabric: Fabric
}