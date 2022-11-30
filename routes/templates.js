const express = require('express');
const {
    getTemplates, 
    getTemplate, 
    createTemplate, 
    updateTemplate, 
    deleteTemplate
} = require('../controllers/templates');
const { protect } = require('../middleware/auth');

const router = express.Router();

router
    .route('/')
    .get(protect, getTemplates)
    .post(protect, createTemplate)

router
    .route('/:id')
    .get(protect, getTemplate)
    .put(protect, updateTemplate)
    .delete(protect, deleteTemplate)

module.exports = router;