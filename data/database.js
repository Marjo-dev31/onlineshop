const mongodb = require('mongodb');

const MongoCLient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
    const client = await MongoCLient.connect(
        'mongodb://localhost:27017'
    );
    database = client.db('online-shop');
};

function getDb() {
if(!database) {
    throw new Error('You must connect first!');
};

return database
};


module.exports = {
    connectToDatabase: connectToDatabase,
    getDb: getDb
};