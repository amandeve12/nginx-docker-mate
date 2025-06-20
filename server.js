const express = require('express');
const path  = require('path')

const app = express();
const port = 6000;

const replicateApp = process.env.APP_NAME

// app.get('/', (req, res) => res.send('App is listen at 6000'));

app.use('/', (req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
    console.log(`request served using nodejs ${replicateApp}`);
})

app.listen(port, () => console.log(`${replicateApp} listening on port ${port}`));
