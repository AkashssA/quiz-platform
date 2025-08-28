// pages/JoinQuiz.js
import React, { useState, useEffect } from 'react';
import api from '../api';

function JoinQuiz() {
  const [pin, setPin] = useState('');
  const [username, setUsername] = useState('');
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [timerActive, setTimerActive] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Auto-submit when time runs out
      handleSubmit();
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const handleJoin = async () => {
    if (!pin || !username) {
      setError('Please enter both PIN and your name.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await api.get(`/quiz/join/${pin}`);
      setQuiz(res.data);
      setAnswers(new Array(res.data.questions.length).fill(null));
      setScore(null);
      setCurrentQuestion(0);
      // Set timer based on quiz.timerPerQuestion or default to 30 seconds per question
      const timerPerQuestion = res.data.timerPerQuestion || 30;
      setTimeLeft(res.data.questions.length * timerPerQuestion);
      setTimerActive(true);
    } catch (err) {
      setError('Quiz not found.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (option) => {
    const updated = [...answers];
    updated[currentQuestion] = option;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    if (answers.includes(null)) {
      setError('Please answer all questions before submitting.');
      return;
    }

    setTimerActive(false);
    try {
      const res = await api.post(`/quiz/submit/${pin}`, {
        username,
        answers
      });
      setScore(res.data.score);
    } catch (err) {
      setError('Error submitting quiz.');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>🎯 Join Quiz</h2>

      {!quiz && (
        <div style={{ 
          textAlign: 'center',
          padding: '3rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '2rem', color: '#333' }}>Enter Quiz Details</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <input
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter Quiz PIN"
              style={{ 
                padding: '0.75rem', 
                width: '250px',
                borderRadius: '8px',
                border: '2px solid #e1e5e9',
                fontSize: '16px'
              }}
            />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Your Name"
              style={{ 
                padding: '0.75rem', 
                width: '250px',
                borderRadius: '8px',
                border: '2px solid #e1e5e9',
                fontSize: '16px'
              }}
            />
            <button
              onClick={handleJoin}
              disabled={loading}
              style={{
                padding: '0.75rem 2rem',
                backgroundColor: loading ? '#6c757d' : '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              {loading ? 'Loading...' : '🚀 Join Quiz'}
            </button>
          </div>
          {error && <p style={{ color: '#dc3545', marginTop: '1rem' }}>{error}</p>}
        </div>
      )}

      {quiz && score === null && (
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', padding: '2rem' }}>
          {/* Header with timer and progress */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '2rem',
            padding: '1rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px'
          }}>
            <div>
              <h3 style={{ margin: 0, color: '#333' }}>{quiz.title}</h3>
              <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>
                Question {currentQuestion + 1} of {quiz.questions.length}
              </p>
            </div>
            <div style={{ 
              textAlign: 'center',
              padding: '0.5rem 1rem',
              backgroundColor: timeLeft < 60 ? '#dc3545' : '#28a745',
              color: '#fff',
              borderRadius: '6px',
              fontWeight: 'bold'
            }}>
              ⏰ {formatTime(timeLeft)}
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ 
            width: '100%', 
            height: '8px', 
            backgroundColor: '#e9ecef', 
            borderRadius: '4px',
            marginBottom: '2rem'
          }}>
            <div style={{ 
              width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%`,
              height: '100%',
              backgroundColor: '#007bff',
              borderRadius: '4px',
              transition: 'width 0.3s ease'
            }} />
          </div>

          {/* Current Question */}
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ 
              fontSize: '18px', 
              marginBottom: '1.5rem',
              color: '#333',
              lineHeight: '1.5'
            }}>
              {quiz.questions[currentQuestion].question}
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {quiz.questions[currentQuestion].options.map((opt, j) => (
                <button
                  key={j}
                  onClick={() => handleSelect(opt)}
                  style={{
                    padding: '1rem',
                    borderRadius: '8px',
                    border: answers[currentQuestion] === opt ? '3px solid #007bff' : '2px solid #e1e5e9',
                    backgroundColor: answers[currentQuestion] === opt ? '#e6f0ff' : '#fff',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '16px',
                    transition: 'all 0.2s ease',
                    minHeight: '60px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ 
                    marginRight: '1rem',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: answers[currentQuestion] === opt ? '#007bff' : '#e1e5e9',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    {String.fromCharCode(65 + j)}
                  </span>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <button
              onClick={handlePrev}
              disabled={currentQuestion === 0}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: currentQuestion === 0 ? '#6c757d' : '#6c757d',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
                fontSize: '14px'
              }}
            >
              ← Previous
            </button>

            <div style={{ display: 'flex', gap: '1rem' }}>
              {currentQuestion < quiz.questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  style={{
                    padding: '0.75rem 2rem',
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  ✅ Submit Quiz
                </button>
              )}
            </div>
          </div>

          {error && <p style={{ color: '#dc3545', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}
        </div>
      )}

      {score !== null && (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#28a745', marginBottom: '1rem' }}>🎉 Quiz Completed!</h3>
          <div style={{ 
            fontSize: '24px', 
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '1rem'
          }}>
            Your Score: <span style={{ color: '#007bff' }}>{score}</span> / {quiz.questions.length}
          </div>
          <div style={{ 
            fontSize: '18px',
            color: '#666'
          }}>
            Percentage: {Math.round((score / quiz.questions.length) * 100)}%
          </div>
          <button
            onClick={() => {
              setQuiz(null);
              setScore(null);
              setAnswers([]);
              setCurrentQuestion(0);
              setTimeLeft(null);
              setTimerActive(false);
            }}
            style={{
              marginTop: '2rem',
              padding: '0.75rem 2rem',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Take Another Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default JoinQuiz;