// pages/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      height: '100vh',
      background: 'linear-gradient(to right, #007bff, #00c6ff)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚 Quiz Platform</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        Join quizzes, test your knowledge, and track performance.
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={() => navigate('/')} style={btnStyle}>🎮 Join Quiz</button>
        <button onClick={() => navigate('/admin-login')} style={btnStyle}>🛠 Admin Login</button>
      </div>
    </div>
  );
}

const btnStyle = {
  padding: '0.75rem 1.5rem',
  backgroundColor: '#fff',
  color: '#007bff',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default LandingPage;