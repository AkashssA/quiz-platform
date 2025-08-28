import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import AdminNav from '../components/AdminNav';

function EditQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await api.get(`/quiz/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setQuiz(res.data);
      } catch (err) {
        alert('Quiz not found or unauthorized');
        navigate('/admin-dashboard');
      }
    };
    fetchQuiz();
  }, [id, navigate]);

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      if (!quiz.title.trim()) {
        alert('Title is required');
        return;
      }
      const hasInvalid = quiz.questions.some(q => !q.question.trim() || q.options.some(o => !o.trim()) || !q.correctAnswer.trim());
      if (hasInvalid) {
        alert('Each question must have text, all options filled, and a correct answer.');
        return;
      }
      await api.put(`/quiz/${id}`, quiz, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Quiz updated!');
      navigate('/admin-dashboard');
    } catch (err) {
      alert('Failed to update quiz');
    }
  };

  const addQuestion = () => {
    const newQuestion = {
      question: '',
      options: ['', '', '', ''],
      correctAnswer: ''
    };
    setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
  };

  const deleteQuestion = (index) => {
    const updated = quiz.questions.filter((_, i) => i !== index);
    setQuiz({ ...quiz, questions: updated });
  };

  const addOption = (qIndex) => {
    const updated = [...quiz.questions];
    updated[qIndex].options.push('');
    setQuiz({ ...quiz, questions: updated });
  };

  const deleteOption = (qIndex, oIndex) => {
    const updated = [...quiz.questions];
    updated[qIndex].options.splice(oIndex, 1);
    setQuiz({ ...quiz, questions: updated });
  };

  if (!quiz) return <p>Loading...</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <AdminNav />
      <h2>Edit Quiz</h2>
      <input
        value={quiz.title}
        onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
        placeholder="Quiz Title"
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />

      {quiz.questions.map((q, i) => (
        <div key={i} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong>Question {i + 1}</strong>
            <button onClick={() => deleteQuestion(i)} style={{ color: 'red' }}>Delete</button>
          </div>

          <input
            value={q.question}
            onChange={(e) => {
              const updated = [...quiz.questions];
              updated[i].question = e.target.value;
              setQuiz({ ...quiz, questions: updated });
            }}
            placeholder="Question"
            style={{ width: '100%', marginBottom: '0.5rem' }}
          />

          {q.options.map((opt, j) => (
            <div key={j} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input
                value={opt}
                onChange={(e) => {
                  const updated = [...quiz.questions];
                  updated[i].options[j] = e.target.value;
                  setQuiz({ ...quiz, questions: updated });
                }}
                placeholder={`Option ${j + 1}`}
                style={{ flex: 1 }}
              />
              <button onClick={() => deleteOption(i, j)} style={{ color: 'red' }}>✕</button>
            </div>
          ))}

          <button onClick={() => addOption(i)} style={{ marginBottom: '0.5rem' }}>Add Option</button>

          <input
            value={q.correctAnswer}
            onChange={(e) => {
              const updated = [...quiz.questions];
              updated[i].correctAnswer = e.target.value;
              setQuiz({ ...quiz, questions: updated });
            }}
            placeholder="Correct Answer"
            style={{ width: '100%' }}
          />
        </div>
      ))}

      <button onClick={addQuestion} style={{ marginBottom: '1rem' }}>➕ Add Question</button>
      <br />
      <button onClick={handleUpdate} style={{ padding: '0.75rem 1.5rem', fontWeight: 'bold' }}>✅ Update Quiz</button>
    </div>
  );
}

export default EditQuiz;