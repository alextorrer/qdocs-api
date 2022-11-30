const express = require('express');
const dotenv = require('dotenv');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

//Load env file
dotenv.config({path: './config/config.env'});

//Connect to DB
connectDB();

//Routers
const auth = require('./routes/auth');

const app = express();
app.use(express.json()); //Body parser
app.use(errorHandler);

//Bind routes
app.use('/api/v1/auth', auth);

//Run Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log(`Server running on port ${PORT}`));

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise)=>{
    console.log('Error: '+err.message.red);

    //Close server and kill process
    server.close(() => process.exit(1));
})