// server/createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/quizApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  const hashedPassword = await bcrypt.hash('admin123', 10); // 👈 Set your password here
  const admin = new Admin({ username: 'admin', password: hashedPassword });
  await admin.save();
  console.log('Admin created');
  mongoose.disconnect();
}).catch(err => console.error(err));