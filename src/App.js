import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CandidatProvider } from './context/CandidatContext'; // Ajoutez cette importation
import MainSelectionPage from './pages/MainSelectionPage';
import CandidatLoginPage from './pages/auth/CandidatLoginPage';
import EnterpriseLoginPage from './pages/auth/EnterpriseLoginPage';
import AdminLoginPage from './pages/auth/AdminLoginPage';
import CandidatDashboard from './pages/candidat/CandidatDashboard';
import EnterpriseDashboard from './pages/entreprise/EnterpriseDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import PendingApproval from './pages/PendingApproval';
import JobListings from './pages/candidat/JobListings';
import CandidatProfile from './pages/candidat/CandidatProfile';
import MyApplications from './pages/candidat/MyApplications';
import SavedJobs from './pages/candidat/SavedJobs';
import PostJob from './pages/entreprise/PostJob';
import EnterpriseProfile from './pages/entreprise/EnterpriseProfile';
import CandidatesView from './pages/entreprise/CandidatesView';
import AnalyticsPage from './pages/entreprise/AnalyticsPage';
import EnterpriseApprovals from './pages/admin/EnterpriseApprovals';
import UserManagement from './pages/admin/UserManagement';
import './styles/base.css';
import './styles/login.css';
import './styles/forms.css';
import './styles/selection.css';

function App() {
    return (
        <CandidatProvider> {/* Ajoutez ce wrapper autour du Router */}
            <Router>
                <Routes>
                    <Route path="/" element={<MainSelectionPage />} />
                    <Route path="/login/candidat" element={<CandidatLoginPage />} />
                    <Route path="/login/enterprise" element={<EnterpriseLoginPage />} />
                    <Route path="/login/admin" element={<AdminLoginPage />} />
                    <Route path="/candidat-dashboard" element={<CandidatDashboard />} /> {/* J'ai aussi corrigé cette route */}
                    <Route path="/enterprise-dashboard" element={<EnterpriseDashboard />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/pending-approval" element={<PendingApproval />} />
                    <Route path="/candidat/job-listings" element={<JobListings />} />
                    <Route path="/candidat/profile" element={<CandidatProfile />} />
                    <Route path="/candidat/applications" element={<MyApplications />} />
                    <Route path="/candidat/saved-jobs" element={<SavedJobs />} />
                    <Route path="/enterprise/post-job" element={<PostJob />} />
                    <Route path="/enterprise/profile" element={<EnterpriseProfile />} />
                    <Route path="/enterprise/candidates" element={<CandidatesView />} />
                    <Route path="/enterprise/analytics" element={<AnalyticsPage />} />
                    <Route path="/admin/approvals" element={<EnterpriseApprovals />} />
                    <Route path="/admin/users" element={<UserManagement />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </CandidatProvider>
    );
}

export default App;