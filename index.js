const express = require('express');
const path = require('path');
const csv = require('csv-parser');
const fs = require('fs');

const dataController = require('./controllers/data');
const mongoconnect = require('./util/database').mongoconnect;


const app = express();

app.get('/events/data', dataController.getdata);

app.get('/events/find',dataController.find);

mongoconnect(() => {
    app.listen(3000);
})


// write data from csv file to json format on terminal

//  (req,res,next) => {
//     const results = [];

//     fs.createReadStream(path.join(__dirname, 'Backend_assignment_gg_dataset - dataset.csv'))
//         .pipe(csv())// pipes fs data to csv data (csv()-calls csv parser package)
//         .on('data', (data) => results.push(data))
//         .on('end', () => {
//             res.json(results); // Return CSV data as JSON
//         });
// });




