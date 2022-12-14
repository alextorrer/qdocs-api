const express = require('express');
const {
    getDatabases, 
    getDatabase, 
    createDatabase, 
    updateDatabase, 
    deleteDatabase,
    getRecords
} = require('../controllers/databases');
const { protect } = require('../middleware/auth');

const router = express.Router();

router
    .route('/')
    .get(protect, getDatabases)
    .post(protect, createDatabase)

router
    .route('/:id')
    .get(protect, getDatabase)
    .put(protect, updateDatabase)
    .delete(protect, deleteDatabase)

router.route('/:id/records').get(protect, getRecords);

module.exports = router;