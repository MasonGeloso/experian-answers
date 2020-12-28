const { getInputs, Fabric } = require('../DayThreePartTwo');




test('Reads and parses inputs', async () => {

    const inputs = await getInputs();

    for (const input of inputs) {
        expect(input).toHaveProperty('id');
        expect(input).toHaveProperty('width');
        expect(input).toHaveProperty('height');
        expect(input).toHaveProperty('distanceFromTop');
        expect(input).toHaveProperty('distanceFromLeft');

        expect(typeof input.id).toBe('number');
        expect(typeof input.width).toBe('number');
        expect(typeof input.height).toBe('number');
        expect(typeof input.distanceFromTop).toBe('number');
        expect(typeof input.distanceFromLeft).toBe('number');
    }
})


describe('Fabric Class', () => {

    const fabric = new Fabric(10, 10);

    const cleanInput = [
        "#2 @ 4,6: 2x2",
        "#3 @ 1,1: 2x2",
    ]

    const input = [
        "#1 @ 2,5: 2x2",
        "#2 @ 4,6: 3x4",
        "#3 @ 1,5: 2x3",
    ]

    const overlappingInput = [
        "#1 @ 2,5: 2x2",
        "#2 @ 2,4: 3x4",
    ]



    test('boarders calculates properly', () => {
        expect(fabric.leftBoarder).toEqual(
            [1, 11, 21, 31, 41, 51, 61, 71, 81, 91]
        );

        expect(fabric.topBoarder).toEqual(
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        );

        expect(fabric.height).toEqual(10);
        expect(fabric.width).toEqual(10);
    });

    test('converts claim string properly', async () => {
        expect(await fabric.convertClaimStrings(input[0])).toEqual(
            {
                id: 1,
                distanceFromLeft: 2,
                distanceFromTop: 5,
                width: 2, height: 2
            }
        )
    })

    test('translate and map claim ID properly', async () => {
        await fabric.translateAndMapClaim(input[0]);
        expect(fabric.mappedClaims).toEqual(
            { "53": [1], "54": [1], "63": [1], "64": [1] }
        );
    });

    test('translate and map claims properly', async () => {
        fabric.reset();
        await fabric.translateAndMapClaims(input);

        expect(fabric.mappedClaims).toEqual(
            {
                "52": [3], "53": [1, 3], "54": [1], "62": [3], "63": [1, 3],
                "64": [1], "65": [2], "66": [2], "67": [2], "72": [3],
                "73": [3], "75": [2], "76": [2], "77": [2], "85": [2],
                "86": [2], "87": [2], "95": [2], "96": [2], "97": [2] 
            }
        )
    });

    test('Proper viewing experience', () => {

        // A little weird to test but gotta get that 100% coverage
        expect(fabric.view()).toBe(
` .  .  .  .  .  .  .  .  .  . 
 .  .  .  .  .  .  .  .  .  . 
 .  .  .  .  .  .  .  .  .  . 
 .  .  .  .  .  .  .  .  .  . 
 .  .  .  .  .  .  .  .  .  . 
 .  3  X  1  .  .  .  .  .  . 
 .  3  X  1  2  2  2  .  .  . 
 .  3  3  .  2  2  2  .  .  . 
 .  .  .  .  2  2  2  .  .  . 
 .  .  .  .  2  2  2  .  .  . \n`)
    })

    test('calculate overlap properly', async () => {
        fabric.reset();
        await fabric.translateAndMapClaims(overlappingInput);
        const overlappedClaims = await fabric.calculateOverlap();

        expect(overlappedClaims).toEqual(
            { "53": [1, 2], "54": [1, 2], "63": [1, 2], "64": [1, 2] }
        );

        expect(Object.keys(overlappedClaims).length).toEqual(4);
    });

    test('calculate clean claims', async () => {

        fabric.reset();
        await fabric.translateAndMapClaims(cleanInput);
        const cleanClaims = await fabric.getCleanClaims();

        expect(cleanClaims).toEqual(['2', '3'])
    })

})