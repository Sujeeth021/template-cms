const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.config.js');
const dotenv = require('dotenv');
const templatesRoute = require('./routes/template');

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/templates', templatesRoute);

// Connect to Database and start server
connectDB()
  .then(() => {
    console.log('✅ Database connected successfully.');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err);
    process.exit(1); // Exit if DB connection fails
  });
