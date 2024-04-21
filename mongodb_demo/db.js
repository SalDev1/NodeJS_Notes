const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');
/*
  The JOB on the mongoDB is to connect the mongoDB database using 
  the mongoose.connect.
*/
const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://admin1234:admin1234@cluster0.fssuhi4.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=Cluster0");
        console.log(`MongoDB is been connected to ${conn.connection.host}`)

    } catch(err) {
        console.log(`There is been an error ${err.message}`)
    }
}

// 2nd Way of Connecting your MongoDB Database. 
// This way to be considered if you are working with the local MongoDB software installed 
// i.e MongoDB Compass.

let dbConnection;
const connectDB2 = (cb) => {
    MongoClient.connect('mongodb://localhost:27017/authors')
    .then((client) => {
        client.db();
        return cb();
    }).catch(err => {
        console.log(err);
        return cb(err);
    })
}

const getConnectDB2 = () => dbConnection;


module.exports = {
    connectDB,
    connectDB2,
    getConnectDB2
};