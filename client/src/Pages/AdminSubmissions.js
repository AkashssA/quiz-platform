import React, { useState } from 'react';
import api from '../api';
import AdminNav from '../components/AdminNav';

function AdminSubmissions() {
  const [pin, setPin] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchSubmissions = async () => {
    if (!pin) {
      setError('Please enter a quiz PIN.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await api.get(`/quiz/responses/${pin}`, { params: { page: 1, limit: 50 } });
      setSubmissions(res.data.items || []);
    } catch (err) {
      setError('Failed to fetch submissions. Make sure the PIN is correct.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: 'auto' }}>
      <AdminNav />
      <h2 style={{ textAlign: 'center' }}>🧑‍💼 Admin: Quiz Submissions</h2>

      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <input
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Enter Quiz PIN"
          style={{
            padding: '0.5rem',
            width: '200px',
            marginRight: '1rem',
            borderRadius: '6px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={fetchSubmissions}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          🔍 View Submissions
        </button>
      </div>

      {loading && <p style={{ textAlign: 'center' }}>Loading submissions...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {submissions.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={thStyle}>Username</th>
              <th style={thStyle}>Score</th>
              <th style={thStyle}>Submitted At</th>
              <th style={thStyle}>Answers</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s, i) => (
              <tr key={i}>
                <td style={tdStyle}>{s.username}</td>
                <td style={tdStyle}>{s.score}</td>
                <td style={tdStyle}>{new Date(s.submittedAt).toLocaleString()}</td>
                <td style={tdStyle}>{s.answers.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle = {
  padding: '0.75rem',
  borderBottom: '1px solid #ccc',
  textAlign: 'left'
};

const tdStyle = {
  padding: '0.75rem',
  borderBottom: '1px solid #eee'
};

export default AdminSubmissions;