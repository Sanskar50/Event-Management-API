const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const dbName = 'eventsDB'; // Database name
const collectionName = 'events'; // Collection name

const events = [];


fs.createReadStream(path.join(__dirname, 'dummy- dataset.csv'))
    .pipe(csv())
    .on('data', async (row) => {
        try {
            const event = {
                eventName: row['event_name'],
                cityName: row['city_name'],
                date: new Date(row['date']),
                time: row['time'],
                latitude: parseFloat(row['latitude']),
                longitude: parseFloat(row['longitude']),
            };
            events.push(event);
        } catch (err) {
            console.error('Error inserting data:', err);
        }
    })
    .on('end', async () => {
        const client = await MongoClient.connect('mongodb+srv://mr-ss:OqPlVe8nWQieZ65s@cluster0.rwwbhzq.mongodb.net/eventsDB?retryWrites=true&w=majority&appName=Cluster0');
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        await collection.insertMany(events);
        client.close();
        console.log('CSV file successfully processed');
    });


