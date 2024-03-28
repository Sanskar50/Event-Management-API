const Data = require('../models/data');

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


