const mongoose = require('mongoose');
const config = require('config');
const mongoURI = config.get("mongoURI");

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });


    } catch (error) {
        console.log(error.message);
        process.exit(1);

    }
}
module.exports = connectDB;