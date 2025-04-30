const express = require('express');
const router = express.Router();
const Template = require('../models/template');

// GET all templates
router.get('/', async (req, res) => {
  try {
    const templates = await Template.find();
    res.json(templates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST a new template
router.post('/', async (req, res) => {
  try {
    const { title, description, thumbnail, previewLink, downloadLink } = req.body;

    // Basic validation
    if (!title || !description || !thumbnail || !previewLink || !downloadLink) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const newTemplate = new Template({
      title,
      description,
      thumbnail,
      previewLink,
      downloadLink,
    });

    await newTemplate.save();
    res.status(201).json({ message: 'Template created successfully!', template: newTemplate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
