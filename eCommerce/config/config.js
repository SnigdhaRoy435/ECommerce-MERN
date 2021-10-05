// this is our data base file
const mongoose = require('mongoose');
require('colors');

//anonimus function to connect with database
const connectDB = async () => {
    try {
        // connecting database using .env file
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log(`Mongodb is connected ${conn.connection.host}`.yellow)

    } catch (error) {
        console.log(`Error: ${error.message}`)
        // to exit (here 1 means failure yaha 1 k sath connection exit ho jayaga)
        process.exit(1);
    }
}

// exporting this file to use in server.js
module.exports = connectDB;