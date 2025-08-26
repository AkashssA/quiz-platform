const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const quizRoutes = require('./routes/quiz');
const adminRoutes = require('./routes/Admin'); // ✅ Add this line

app.use('/api/quiz', quizRoutes);
app.use('/api/admin', adminRoutes); // ✅ Register admin routes

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log('Server running on port 5000'));
}).catch(err => console.log(err));
