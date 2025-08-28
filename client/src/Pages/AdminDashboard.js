import { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import AdminNav from '../components/AdminNav';

function AdminDashboard() {
  const navigate = useNavigate(); // ✅ Moved inside the component
  const [quizzes, setQuizzes] = useState([]);

  const fetchQuizzes = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await api.get('/quiz/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQuizzes(res.data);
    } catch (err) {
      alert('Failed to fetch quizzes');
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await api.delete(`/quiz/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Quiz deleted');
      fetchQuizzes(); // Refresh list
    } catch (err) {
      alert('Failed to delete quiz');
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div>
      <AdminNav />
      <h2>Admin Dashboard</h2>
      {quizzes.length === 0 ? (
        <p>No quizzes found.</p>
      ) : (
        quizzes.map((quiz) => (
          <div key={quiz._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>{quiz.title}</h3>
            <p>PIN: {quiz.pin}</p>
            <p>Questions: {quiz.questions.length}</p>
            <button onClick={() => handleDelete(quiz._id)}>Delete</button>
            <button onClick={() => navigate(`/edit-quiz/${quiz._id}`)}>Edit</button>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminDashboard;