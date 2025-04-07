// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainSelectionPage from './pages/MainSelectionPage';
import StudentLoginPage from './pages/StudentLoginPage';
import EnterpriseLoginPage from './pages/EnterpriseLoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import StudentDashboard from './pages/StudentDashboard';
import EnterpriseDashboard from './pages/EnterpriseDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PendingApproval from './pages/PendingApproval';
import './styles/base.css';
import './styles/login.css';
import './styles/forms.css';
import './styles/selection.css';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<MainSelectionPage />} />
          <Route path="/login/student" element={<StudentLoginPage />} />
          <Route path="/login/enterprise" element={<EnterpriseLoginPage />} />
          <Route path="/login/admin" element={<AdminLoginPage />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/enterprise-dashboard" element={<EnterpriseDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/pending-approval" element={<PendingApproval />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
  );
}

export default App;