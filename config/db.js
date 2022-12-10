const mongoose = require('mongoose');

//Connect to MongoDB
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log('Connected to MongoDB: '+conn.connection.host);
}

module.exports = connectDB;