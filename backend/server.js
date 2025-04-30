const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const templatesRoute = require('./routes/template');
const loginRoute = require('./routes/login');
const signupRoute = require('./routes/signup');

dotenv.config(); // Load .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/templates', templatesRoute);

app.use('/login', loginRoute);
app.use('/signup', signupRoute);


// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});
