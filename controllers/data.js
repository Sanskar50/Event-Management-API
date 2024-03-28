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

exports.find = (req, res, next) => {
    
    // Get current date
    const currentDate = new Date();
    // Calculate date after two weeks
    const twoWeeksLater = new Date();
    twoWeeksLater.setDate(currentDate.getDate() + 14);

    // Construct query to fetch events in the next two weeks
    const query = {
        date: { $gt: currentDate, $lt: twoWeeksLater } // Assuming 'date' field in your collection
    };

    // Define projection to fetch only selective parameters
    const projection = {
        _id: 0, // Exclude _id field
        eventName: 1, // Include eventName field
        city: 1, // Include city field
        date: 1 // Include date field
        // Add more fields as needed
    };

    // Fetch events based on query and projection
    const events = await collection.find(query).project(projection).toArray();

    console.log('Events occurring in the next two weeks:', events);
        .catch (error => {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching data' });
    });
};
