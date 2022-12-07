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
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}

);

//Reverse populate with virtuals (get child records)
DictionaryModel.virtual('entries', {
    ref: 'Entry',
    localField: '_id',
    foreignField: 'dictionary',
    justOne: false
});

module.exports = mongoose.model('Dictionary', DictionaryModel);