const { Fabric } = require('./index');

const express = require('express');
const app = express();

app.use(express.json());

const fabric = new Fabric(10, 10);

app.get('/mapped_claims', (req, res) => {
    res.send(fabric.mappedClaims);
});

app.get('/map', (req, res) => {
    res.send(fabric.view(true));
});

app.get('/claims/clean', async (req, res) => {
    res.send(await fabric.getCleanClaims());
});

app.get('/claims/overlapping', async (req, res) => {
    res.send(await fabric.calculateOverlap());
});

app.get('/claim/:claimId', (req, res) => {
    const claimId = req.params.claimId;

    res.send(
        fabric.claims[claimId]
    )
});

app.get('/fabric/:fabricId', (req, res) => {
    res.send(
        fabric.mappedClaims[req.params.fabricId]
    )
});

app.post('/map_claims', async (req, res) => {
    try {
        await fabric.translateAndMapClaims(req.body);
        res.send(fabric.mappedClaims);

    } catch(err){
        res.send('Failed to map claims. Please check claim IDs');
    }
});

app.listen(80, () => {
    console.log('Stupid not needed API running..');
});