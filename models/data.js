const mongodb = require('mongodb');
const mongoconnect = require('../util/database').mongoconnect
const getdb = require('../util/database').getdb;


class Data {
    constructor(event_name, city_name, date, time, latitude, longitude) {
        this.event_name = event_name;
        this.city_name = city_name;
        this.date = date;
        this.time = time;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    static fetchAll() {
        const db = getdb();
        // console.log(db);
        return db.collection('events').find().toArray()
            .then(data => {
                console.log(data);
                return data;
            }).catch(err => {
                console.log(err);
            });
    };

}

module.exports = Data;
