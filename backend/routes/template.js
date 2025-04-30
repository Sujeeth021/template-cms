// routes/templateRoutes.js
const express = require('express');
const router = express.Router();

const authenticateToken = require('../middlewares/authMiddleware');

const {
  getAllTemplates,
  createTemplate,
} = require('../controllers/templateController');

// GET all templates
router.get('/', authenticateToken , getAllTemplates);

// POST a new template
router.post('/', authenticateToken , createTemplate);

module.exports = router;
