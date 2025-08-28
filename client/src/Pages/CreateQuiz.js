// pages/CreateQuiz.js
import React, { useState } from 'react';
import api from '../api';
import AdminNav from '../components/AdminNav';
import { englishTemplates } from '../data/englishTemplates';

function CreateQuiz() {
  const [title, setTitle] = useState('');
  const [pin, setPin] = useState('');
  const [timerPerQuestion, setTimerPerQuestion] = useState(30); // Default 30 seconds per question
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctAnswer: '' }
  ]);

  const handleCreate = async () => {
    const token = localStorage.getItem('token'); // ✅ Get token from localStorage

    if (!token) {
      alert('You must be logged in as admin to create a quiz.');
      return;
    }

    if (!title.trim() || !pin.trim() || questions.length === 0) {
      alert('Title, PIN, and at least one question are required.');
      return;
    }
    if (!/^\d{4}$/.test(pin)) {
      alert('PIN must be a 4-digit number.');
      return;
    }
    const hasInvalid = questions.some(q => !q.question.trim() || q.options.some(o => !o.trim()) || !q.correctAnswer.trim());
    if (hasInvalid) {
      alert('Each question must have text, all options filled, and a correct answer.');
      return;
    }

    try {
      await api.post('/quiz/create', {
        title,
        pin,
        questions,
        timerPerQuestion // Include timer in the quiz data
      }, {
        headers: {
          Authorization: `Bearer ${token}` // ✅ Send token in header
        }
      });

      alert('Quiz created!');
      setTitle('');
      setPin('');
      setTimerPerQuestion(30);
      setQuestions([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
    } catch (err) {
      alert('Error creating quiz');
      console.error(err);
    }
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  return (
    <div>
      <AdminNav />
      <h2>Create Quiz</h2>
      
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '0.5rem' }}>Template:</label>
        <select
          onChange={(e) => {
            const t = englishTemplates.find(x => x.id === e.target.value);
            if (t) {
              setTitle(t.title);
              setQuestions(t.questions.map(q => ({ ...q })));
            }
          }}
          defaultValue=""
        >
          <option value="" disabled>Select English template (optional)</option>
          {englishTemplates.map(t => (
            <option key={t.id} value={t.id}>{t.title}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '0.5rem' }}>Timer per question (seconds):</label>
        <select
          value={timerPerQuestion}
          onChange={(e) => setTimerPerQuestion(parseInt(e.target.value))}
          style={{ padding: '0.25rem' }}
        >
          <option value={15}>15 seconds</option>
          <option value={30}>30 seconds</option>
          <option value={45}>45 seconds</option>
          <option value={60}>1 minute</option>
          <option value={90}>1.5 minutes</option>
          <option value={120}>2 minutes</option>
          <option value={0}>No timer</option>
        </select>
      </div>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Quiz Title"
      />
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem' }}>
        <input
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="4-digit PIN"
        />
        <button 
          onClick={() => setPin(Math.floor(1000 + Math.random() * 9000).toString())}
          style={{ padding: '0.5rem', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Generate PIN
        </button>
      </div>

      {questions.map((q, i) => (
        <div key={i}>
          <input
            value={q.question}
            onChange={(e) => {
              const newQ = [...questions];
              newQ[i].question = e.target.value;
              setQuestions(newQ);
            }}
            placeholder="Question"
          />
          {q.options.map((opt, j) => (
            <input
              key={j}
              value={opt}
              onChange={(e) => {
                const newQ = [...questions];
                newQ[i].options[j] = e.target.value;
                setQuestions(newQ);
              }}
              placeholder={`Option ${j + 1}`}
            />
          ))}
          <input
            value={q.correctAnswer}
            onChange={(e) => {
              const newQ = [...questions];
              newQ[i].correctAnswer = e.target.value;
              setQuestions(newQ);
            }}
            placeholder="Correct Answer"
          />
        </div>
      ))}

      <button onClick={addQuestion}>Add Another Question</button>
      <button onClick={handleCreate}>Create Quiz</button>
    </div>
  );
}

export default CreateQuiz;