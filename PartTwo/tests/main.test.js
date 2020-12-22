const { getEndFrequency, getFrequencies } = require('../index');


// Here are some tests for you
test('Changes Frequency Correctly', async () => {

    // I over do testing - hire me

    // Has a repeat value of 2
    const testSet = ["+5", "-3", "+1", "-1", "+90"];
    const expectedTestSetResult = 2;
    const expectedResult = 486;

    // Tests with test data
    const testSetTest = await getEndFrequency(testSet);
    expect(testSetTest.currentFrequency).toEqual(expectedTestSetResult);
    expect(testSetTest.currentFrequency).toBeTruthy();

    // Tests with real input
    const realDataTest = await getEndFrequency(getFrequencies());
    expect(realDataTest.currentFrequency).toEqual(expectedResult);
    expect(realDataTest.foundRepeat).toBeFalsy();

});