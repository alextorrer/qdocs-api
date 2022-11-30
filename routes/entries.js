const express = require('express');
const {
    getEntries, 
    getEntry, 
    createEntry, 
    updateEntry, 
    deleteEntry
} = require('../controllers/entries');
const { protect } = require('../middleware/auth');

const router = express.Router();

router
    .route('/')
    .get(protect, getEntries)
    .post(protect, createEntry)

router
    .route('/:id')
    .get(protect, getEntry)
    .put(protect, updateEntry)
    .delete(protect, deleteEntry)

module.exports = router;