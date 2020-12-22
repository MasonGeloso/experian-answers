const { getEndFrequency, getFrequencies } = require('./../index');


test('Changes Frequency Correctly', async () => {
    const testSet = ["+5", "-3", "+1"];
    const expectedTestSetResult = 3;
    const expectedResult = 486;

    // Tests with test data
    expect(await getEndFrequency(testSet)).toEqual(expectedTestSetResult);

    // Tests with real input
    expect(await getEndFrequency(getFrequencies())).toEqual(expectedResult);

})