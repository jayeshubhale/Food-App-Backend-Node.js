const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`.green.underline.bold);

    }
    catch (error) {
        console.log("DB error", error, colors.bgRed);
    }
}
module.exports = connectDB;