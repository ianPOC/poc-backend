const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db: any;

const mongoConnect = (callback: any) => {
    MongoClient.connect(
        'mongodb+srv://ianpedro7:pjN4rOHNNeGLHIJo@cluster0.f5ttwjn.mongodb.net/?retryWrites=true&w=majority', 
        { useUnifiedTopology: true }
    ).then((client: any) => {
        console.log('CONNECTED TO MONGO DB');
        _db = client.db();
        callback(client);
    })
    .catch((err: any) => {
        console.log(`ERROR WHILE CONNECTION TO MONGO DB ${err}`);
    });
}

const getMongoDb = () => {
    if (_db) {
        return _db
    }

    throw 'NO DATABSE FOUND'
}

exports.mongoConnect = mongoConnect;
exports.getMongoDb = getMongoDb;
