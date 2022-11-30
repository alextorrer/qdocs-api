const mongoose = require('mongoose');

const TemplateModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'La plantilla necesita un nombre']
    },
    dictionary: {
        type: mongoose.Schema.ObjectId,
        ref: 'Dictionary',
        required: true
    },
    file:{
        type: String,
        required: [true, 'La plantilla necesita un documento asociado']
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Template', TemplateModel);