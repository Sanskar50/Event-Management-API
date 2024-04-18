const Data = require('../models/data');
const getdb = require('../util/database').getdb;
const axios = require('axios');

exports.getdata = (req, res, next) => {
    Data.fetchAll()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while fetching data' });
        });
};

exports.find = async (req, res, next) => {
    const db = getdb();
    const slat = req.query.latitude;
    const slong = req.query.longitude;

    // console.log(slat);
    // console.log(slong);


    const currentDate = new Date();


    const twoWeeksLater = new Date();
    twoWeeksLater.setDate(currentDate.getDate() + 14);


    const query = {
        date: { $gt: currentDate, $lt: twoWeeksLater }
    };


    const projection = {
        _id: 0,
    };

    const finalRes = [];

    try {
        const parEvents = await db.collection('events').find(query, { projection }).toArray();

        for (const evt of parEvents) {
            const { eventName, cityName, date, latitude, longitude } = evt;

            const stringDate = date.toISOString();

            const formatDate = stringDate.split('T')[0];


            const apiRes1 = await fetch(`https://gg-backend-assignment.azurewebsites.net/api/Weather?code=API_KEY=&city=${cityName}&date=${formatDate}`);
            const apiRes2 = await fetch(`https://gg-backend-assignment.azurewebsites.net/api/Distance?code=API_KEY=&latitude1=${latitude}&longitude1=${longitude}&latitude2=${slat}&longitude2=${slong}`);


            const apiData1 = await apiRes1.json();
            const apiData2 = await apiRes2.json();


            const combinedEvent = {
                event_name: eventName,
                city_name: cityName,
                date: formatDate,
                weather: apiData1.weather,
                distance_km: apiData2.distance,
            }
            finalRes.push(combinedEvent);
        }
        res.json(finalRes);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to fetch events' });
    }
};