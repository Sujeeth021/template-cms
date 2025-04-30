const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.config.js');
const dotenv = require('dotenv');
const templatesRoute = require('./routes/template');
const loginRoute = require('./routes/login');
const signupRoute = require('./routes/signup');
const mongoose = require('mongoose');

dotenv.config(); // Load .env

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

app.use('/login', loginRoute);
app.use('/signup', signupRoute);
app.use('/api/templates', templatesRoute);



// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

