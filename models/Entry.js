const mongoose = require('mongoose');

const EntryModel = new mongoose.Schema({
    dictionary: {
        type: mongoose.Schema.ObjectId,
        ref: 'Dictionary',
        required: true
    },
    column: {
        type: String,
        required: [true, 'La entrada necesita referenciar una columna/atributo']
    },
    token: {
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Entry', EntryModel);