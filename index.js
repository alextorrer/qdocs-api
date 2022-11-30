const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

//Load env file
dotenv.config({path: './config/config.env'});

//Connect to DB
connectDB();

//Routers
const auth = require('./routes/auth');
const databases = require('./routes/databases');
const dictionaries = require('./routes/dictionaries');

const app = express();
app.use(express.json()); //Body parser
app.use(cookieParser()); //Cookie parser

//Bind routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/databases', databases);
app.use('/api/v1/dictionaries', dictionaries);

app.use(errorHandler); //error handler middleware

//Run Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log(`Server running on port ${PORT}`));

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise)=>{
    console.log('Error: '+err.message.red);

    //Close server and kill process
    server.close(() => process.exit(1));
})