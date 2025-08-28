// src/App.js
import React from 'react';
// App.js
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation, Outlet } from 'react-router-dom';
import JoinQuiz from './Pages/JoinQuiz';
import CreateQuiz from './Pages/CreateQuiz';
import AdminDashboard from './Pages/AdminDashboard';
import AdminLogin from './Pages/AdminLogin';
import EditQuiz from './Pages/EditQuiz';
import AdminSubmissions from './Pages/AdminSubmissions';

function RequireAuth() {
  const location = useLocation();
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }
  return <Outlet />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JoinQuiz />} />
        <Route path="/admin-login" element={<AdminLogin/>}/>
        <Route element={<RequireAuth />}>
          <Route path="/admin" element={<CreateQuiz />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/edit-quiz/:id" element={<EditQuiz />} />
          <Route path="/admin-submissions" element={<AdminSubmissions />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;