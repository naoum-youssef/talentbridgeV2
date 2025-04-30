import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const CandidatSidebar = () => {
    const location = useLocation();

    // Navigation items for the sidebar
    const navItems = [
        { path: '/candidat/dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
        { path: '/candidat/profile', label: 'My Profile', icon: 'fas fa-user' },
        { path: '/candidat/jobs', label: 'Job Listings', icon: 'fas fa-briefcase' },
        { path: '/candidat/applications', label: 'My Applications', icon: 'fas fa-file-alt' },
        { path: '/candidat/interviews', label: 'Interviews', icon: 'fas fa-calendar-check' },
        { path: '/candidat/messages', label: 'Messages', icon: 'fas fa-envelope' },
    ];

    return (
        <div className="bg-white shadow-md rounded-lg p-4 w-64">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800">Talent Bridge</h2>
                <p className="text-sm text-gray-600">Candidate Portal</p>
            </div>

            <nav>
                <ul>
                    {navItems.map((item) => (
                        <li key={item.path} className="mb-2">
                            <Link
                                to={item.path}
                                className={`flex items-center p-2 rounded-md transition-colors ${
                                    location.pathname === item.path
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <i className={`${item.icon} mr-3`}></i>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="mt-auto pt-6 border-t border-gray-200">
                <Link
                    to="/logout"
                    className="flex items-center p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                    <i className="fas fa-sign-out-alt mr-3"></i>
                    Logout
                </Link>
            </div>
        </div>
    );
};

export default CandidatSidebar;