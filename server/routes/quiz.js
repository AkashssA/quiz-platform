const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const Submission = require('../models/Submission');
const jwt = require('jsonwebtoken');

// Middleware to verify admin token
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    req.adminId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// ==========================
// Admin Protected Routes
// ==========================

// Get all quizzes
router.get('/all', verifyToken, async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a quiz
router.post('/create', verifyToken, async (req, res) => {
  const { title, pin, questions } = req.body;
  try {
    const quiz = new Quiz({ title, pin, questions });
    await quiz.save();
    res.status(201).json({ message: 'Quiz created', quiz });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a quiz by ID
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id);
    res.json({ message: 'Quiz deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a quiz by ID
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: 'Quiz updated', quiz: updatedQuiz });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get quiz by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================
// Public Routes
// ==========================

// Join a quiz by PIN
router.get('/join/:pin', async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ pin: req.params.pin });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit answers and calculate score
router.post('/submit/:pin', async (req, res) => {
  const { username, answers } = req.body;
  const pin = req.params.pin;

  try {
    const quiz = await Quiz.findOne({ pin });
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    let score = 0;
    quiz.questions.forEach((q, i) => {
      if (q.correctAnswer === answers[i]) score++;
    });

    const submission = new Submission({
      pin,
      username,
      answers,
      score,
      submittedAt: new Date()
    });

    await submission.save();
    res.json({ score, total: quiz.questions.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/responses/:pin', async (req, res) => {
  const pin = req.params.pin;
  const submissions = await Submission.find({ pin });
  res.json(submissions);
});

module.exports = router;
