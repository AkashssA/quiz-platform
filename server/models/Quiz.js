const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: String,
  pin: String,
  timerPerQuestion: { type: Number, default: 30 }, // Timer in seconds per question
  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: String
    }
  ]
});

module.exports = mongoose.model('Quiz', quizSchema);