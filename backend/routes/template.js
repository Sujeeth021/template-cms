// routes/templateRoutes.js
const express = require('express');
const router = express.Router();

const {
  getAllTemplates,
  createTemplate,
} = require('../controllers/templateController');

const Template = require('./models/template');


// GET all templates
router.get('/', getAllTemplates);

// POST a new template
router.post('/', createTemplate);

module.exports = router;
