const mongoose = require('mongoose');

const DatabaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'La base de datos necesita un nombre']
    },
    url:{
        type: String,
        required: [true, 'Se necesita el URL']
    },
    username: {
        type: String,
        required: [true, 'Se necesita el usuario']
    },
    password: {
        type: String,
        required: [true, 'Se necesita la contraseña']
    },
    password: {
        type: String,
        required: [true, 'Se necesita especificar una tabla']
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Database', DatabaseSchema);