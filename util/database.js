const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (callback) => {
    mongoClient.connect('mongodb+srv://Himal-Marasini:d9N5RVJwphhMJVaq@shop-fkcaf.mongodb.net/shop?retryWrites=true&w=majority', {
        useNewUrlParser: true
    }).then(client => {
        console.log('Succesfully connected to the MongoDB database');
        _db = client.db();
        callback();
    }).catch(err => {
        console.error(err);
    });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;