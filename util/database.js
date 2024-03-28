const mongodb = require('mongodb');
const mongoclient = mongodb.MongoClient;

let _db;

const mongoconnect = (cb) => {
    mongoclient.connect('<username>:<password>@cluster0.rwwbhzq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        .then(client => {
            console.log('Connected!');
            _db=client.db();
            // console.log(_db);
            cb();
        }).catch(err => {
            console.log(err);
            throw err;
        })
};

const getdb = () =>{
if(_db){
    return _db;
}
throw 'No database found!'
};

exports.mongoconnect = mongoconnect;
exports.getdb=getdb;

