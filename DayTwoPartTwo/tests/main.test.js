const {getRelatedBoxes, getInputs, generateCheckSum} = require('../index');


test('Should successfully generate checksums for data sets', async () => {
    const testSet = ["fonwsmjyquwrapeczikghttdpl",
        "fonbsmjkquwrapeczjkghtvdxx",
        "yonbsmjyquwrapecgikghtvdxc",
        "donbsmjyquqrapeczikghtadxl",
        "monbsmjyquprgpeczikghtvdxl",
        "fonbsmjyquwvapecqgkghtvdxl",
        "ftnbsmjyquwrapcczikghtxdxl",
        "fonbsmjyqgwrapeczikghtldxc",
        "fonbsmjsquwmapeyzikghtvdxl"]

    // With testSet data
    const testSetResults = generateCheckSum(testSet);
    expect(testSetResults).toEqual(0);

    // With real data
    const realDataResults = generateCheckSum(getInputs());
    expect(realDataResults).toEqual(4920);
})


test('getRelatedBoxes function does what it is suppose to do', async () => {
    
    const testSet = [
        'fonbsmjyquwrapeelwivghtvdql',
        'foncsajyquwrapeelwivghtvdql',
        'fjnbsmjyquwrapqelwivghtvdql',
        'fonbsmjyquwrapkelwivghtvdql',
        'fonbsmjyquwrapeeawiaghtvdql'
    ]

    // const response = getRelatedBoxes(testSet);
    // expect(response).toEqual('fonbsmjyquwrapelwivghtvdql');

    const realdataResponse = getRelatedBoxes(getInputs());
    expect(realdataResponse).toEqual('fonbwmjquwtapeyzikghtvdxl');
});