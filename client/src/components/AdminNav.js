import { Link, useNavigate } from 'react-router-dom';

function AdminNav() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/admin-login');
  };

  return (
    <nav style={navStyle}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <strong>Admin</strong>
        <Link to="/admin-dashboard" style={linkStyle}>Dashboard</Link>
        <Link to="/admin" style={linkStyle}>Create Quiz</Link>
        <Link to="/admin-submissions" style={linkStyle}>Submissions</Link>
      </div>
      <button onClick={logout} style={logoutBtn}>Logout</button>
    </nav>
  );
}

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.75rem 1rem',
  backgroundColor: '#f8f9fa',
  borderBottom: '1px solid #e5e7eb',
  marginBottom: '1rem'
};

const linkStyle = {
  textDecoration: 'none',
  color: '#007bff'
};

const logoutBtn = {
  padding: '0.4rem 0.75rem',
  backgroundColor: '#dc3545',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

export default AdminNav;


