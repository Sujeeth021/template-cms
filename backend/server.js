const express = require('express');
const cors = require('cors');
const connectDB = require('/config/db.config.js');
const dotenv = require('dotenv');
const templatesRoute = require('./routes/template');

dotenv.config(); // Load .env

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/templates', templatesRoute);

