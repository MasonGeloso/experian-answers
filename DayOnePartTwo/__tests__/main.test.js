const { getEndFrequency, getFrequencies, getRepeatingFrequency } = require('../index');


// Here are some tests for you
test('Changes Frequency Correctly', async () => {

    // I over do testing - hire me

    // Has a repeat value of 2
    const testInput = ["+5", "-3", "+1", "-1", "+90"];
    const expectedTestOutput = 2;

    const expectedResult = 486;

    // Tests with test data
    const testSetTest = await getEndFrequency(testInput);
    expect(testSetTest.currentFrequency).toEqual(expectedTestOutput);
    expect(testSetTest.currentFrequency).toBeTruthy();

    // Tests with real input
    const realDataTest = await getEndFrequency(getFrequencies());
    expect(realDataTest.currentFrequency).toEqual(expectedResult);
    expect(realDataTest.foundRepeat).toBeFalsy();

});


describe('getRepeatingFrequency', () => {
    test('Get repeating frequencies correctly', async () => {

        const testInput = ["+5", "-3", "+1", "-2", "+3"]
        const testExpectedOutput = 5;

        const testResults = await getRepeatingFrequency(testInput);
        expect(testResults).toEqual(testExpectedOutput);
    })

    test('Gets frequency if dataset does not need to repeat', async () => {

        const testInput = ["+5", "-3", "+1", "-1", "+3"]
        const testExpectedOutput = 2;

        const testResults = await getRepeatingFrequency(testInput);
        expect(testResults).toEqual(testExpectedOutput);
    })
})