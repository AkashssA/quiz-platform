const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: String,
  pin: String,
  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: String
    }
  ]
});

module.exports = mongoose.model('Quiz', quizSchema);