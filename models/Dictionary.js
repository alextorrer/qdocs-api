const mongoose = require('mongoose');

const DictionaryModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El diccionario necesita un nombre']
    },
    database: {
        type: mongoose.Schema.ObjectId,
        ref: 'Database',
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Dictionary', DictionaryModel);