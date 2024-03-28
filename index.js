const express = require('express');
const path = require('path');
const csv = require('csv-parser');
const fs = require('fs');

const dataController = require('./controllers/data');
const mongoconnect = require('./util/database').mongoconnect;


const app = express();

app.get('/events/data', dataController.getdata);

mongoconnect(() => {
    app.listen(3000);
})





