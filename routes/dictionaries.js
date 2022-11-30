const express = require('express');
const {
    getDictionaries, 
    getDictionary, 
    createDictionary, 
    updateDictionary, 
    deleteDictionary
} = require('../controllers/dictionaries');
const { protect } = require('../middleware/auth');

const router = express.Router();

router
    .route('/')
    .get(protect, getDictionaries)
    .post(protect, createDictionary)

router
    .route('/:id')
    .get(protect, getDictionary)
    .put(protect, updateDictionary)
    .delete(protect, deleteDictionary)

module.exports = router;