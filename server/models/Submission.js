const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  pin: String,
  username: String,
  answers: [String],
  score: Number,
  submittedAt: Date
});

module.exports = mongoose.model('Submission', submissionSchema);