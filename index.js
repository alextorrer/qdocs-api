const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const colors = require('colors');

//Load env file
dotenv.config({path: './config/config.env'});

//Connect to DB
connectDB();

//Routers
const auth = require('./routes/auth');
const databases = require('./routes/databases');
const dictionaries = require('./routes/dictionaries');
const entries = require('./routes/entries');
const templates = require('./routes/templates');

const app = express();
app.use(express.json()); //Body parser
app.use(cookieParser()); //Cookie parser
//app.use(fileupload()); //File uploading

//Bind routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/databases', databases);
app.use('/api/v1/dictionaries', dictionaries);
app.use('/api/v1/entries', entries);
app.use('/api/v1/templates', templates);

app.use(errorHandler); //error handler middleware

//Run Server
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, console.log(`Server running on port ${PORT}`));

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise)=>{
    console.log(`Error: ${err.message}`.red);

    //Close server and kill process
    server.close(() => process.exit(1));
})