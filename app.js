// const { MongoClient } = require('mongodb');

// mongodb+srv://demo:qwerty12345@cluster0.yegrn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

// Udemy

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

//Database Name
const dbName = 'fruitsDB';

//create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

//use connect method to connect to the server
client.connect(function (err) {
    assert.equal(null, err);
    console.log('Connected successfully to server');
    const db = client.db(dbName);

    // insertDocuments(db, function () {
    //     client.close();
    // });

    findDocuments(db, function () {
        client.close();
    });
});

const insertDocuments = function (db, callback) {
    // Get the documents Collection
    const collection = db.collection('fruits');
    // Insert some document
    collection.insertMany(
        [
            { name: 'Apple', score: 8, review: 'Great Fruit' },
            { name: 'Orange', score: 6, review: 'kinda sour' },
            { name: 'Banana', score: 9, review: 'Great stuff!' },
        ],
        function (err, result) {
            assert.equal(err, null);
            // assert.equal(3, result.result.n);
            // assert.equal(3, result.ops.length);
            console.log('Inserted 3 documents into the collection');
            callback(result);
        }
    );
};

const findDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('fruits');
    // find some documents
    collection.find({}).toArray(function (err, fruits) {
        assert.equal(err, null);
        console.log(' found the following records');
        console.log(fruits);
        callback(fruits);
    });
};
