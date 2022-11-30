const express = require('express');
const dotenv = require('dotenv');

const connectDB = require('./config/db');

//Load env file
dotenv.config({path: './config/config.env'});

//Connect to DB
connectDB();


const app = express();
app.use(express.json()); //Body parser

//Run Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log(`Server running on port ${PORT}`));

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise)=>{
    console.log('Error: '+err.message.red);

    //Close server and kill process
    server.close(() => process.exit(1));
})