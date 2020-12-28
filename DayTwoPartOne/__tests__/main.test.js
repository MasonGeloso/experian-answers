'use strict';

const { generateCheckSum, getInputs } = require('../index');


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