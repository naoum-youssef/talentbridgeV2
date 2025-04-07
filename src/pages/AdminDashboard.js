// src/pages/AdminDashboard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/admin-dashboard.tailwind.css';

const AdminDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard');

    // Mock data for statistics
    const stats = [
        { id: 1, title: 'Étudiants inscrits', count: 1248, increase: 12.5, icon: 'fa-user-graduate', color: 'bg-blue-500' },
        { id: 2, title: 'Entreprises', count: 87, increase: 8.2, icon: 'fa-building', color: 'bg-purple-500' },
        { id: 3, title: 'Stages actifs', count: 156, increase: 24.8, icon: 'fa-briefcase', color: 'bg-green-500' },
        { id: 4, title: 'Demandes en attente', count: 15, increase: -3.6, icon: 'fa-clock', color: 'bg-yellow-500' }
    ];

    // Mock data for recent user registrations
    const recentUsers = [
        { id: 1, name: 'Sophie Martin', type: 'student', email: 'sophie.martin@edu.fr', date: '22 Mar 2023', status: 'Active' },
        { id: 2, name: 'Tech Solutions Inc.', type: 'enterprise', email: 'contact@techsolutions.fr', date: '20 Mar 2023', status: 'Pending' },
        { id: 3, name: 'Thomas Dubois', type: 'student', email: 'thomas.dubois@edu.fr', date: '18 Mar 2023', status: 'Active' },
        { id: 4, name: 'Global Media Group', type: 'enterprise', email: 'hr@gmg.com', date: '15 Mar 2023', status: 'Active' },
        { id: 5, name: 'Camille Lefèvre', type: 'student', email: 'camille.l@edu.fr', date: '14 Mar 2023', status: 'Active' }
    ];

    // Mock data for upcoming internships
    const upcomingInternships = [
        { id: 1, title: 'Développeur Frontend', company: 'Tech Solutions Inc.', applicants: 18, deadline: '30 Mar 2023' },
        { id: 2, title: 'Analyste de données', company: 'DataViz Corp', applicants: 7, deadline: '02 Apr 2023' },
        { id: 3, title: 'Assistant Marketing', company: 'Global Media Group', applicants: 25, deadline: '10 Apr 2023' },
        { id: 4, title: 'Ingénieur Réseau', company: 'NetSec SA', applicants: 5, deadline: '15 Apr 2023' }
    ];

    return (
        <div className="flex h-screen bg-dashboard-light">
            {/* Sidebar */}
            <div
                className={`bg-dashboard-sidebar fixed inset-y-0 left-0 z-30 w-64 flex-shrink-0 overflow-y-auto transition-all duration-300 transform ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-20"
                }`}
            >
                {/* Sidebar Header with Logo */}
                <div className="flex items-center justify-between px-4 py-5">
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary">
                            <span className="text-white font-bold text-lg">TB</span>
                        </div>
                        <span className={`text-white font-semibold text-lg ${!sidebarOpen && 'md:hidden'}`}>
              TalentBridge
            </span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="md:hidden text-gray-500 hover:text-white"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {/* Navigation Menu */}
                <div className="py-4">
                    <div className={`px-4 py-2 text-xs uppercase text-gray-500 ${!sidebarOpen && 'md:hidden'}`}>
                        Navigation
                    </div>

                    <nav className="mt-2">
                        <div
                            className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                            onClick={() => setActiveTab('dashboard')}
                        >
                            <i className="fas fa-tachometer-alt nav-item-icon"></i>
                            <span className={`${!sidebarOpen && 'md:hidden'}`}>Tableau de bord</span>
                        </div>

                        <div
                            className={`menu-item ${activeTab === 'users' ? 'active' : ''}`}
                            onClick={() => setActiveTab('users')}
                        >
                            <i className="fas fa-users nav-item-icon"></i>
                            <span className={`${!sidebarOpen && 'md:hidden'}`}>Utilisateurs</span>
                        </div>

                        <div
                            className={`menu-item ${activeTab === 'internships' ? 'active' : ''}`}
                            onClick={() => setActiveTab('internships')}
                        >
                            <i className="fas fa-briefcase nav-item-icon"></i>
                            <span className={`${!sidebarOpen && 'md:hidden'}`}>Stages</span>
                        </div>

                        <div
                            className={`menu-item ${activeTab === 'approvals' ? 'active' : ''}`}
                            onClick={() => setActiveTab('approvals')}
                        >
                            <i className="fas fa-check-circle nav-item-icon"></i>
                            <span className={`${!sidebarOpen && 'md:hidden'}`}>Approbations</span>
                            <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 min-w-[20px] flex items-center justify-center px-1">
                4
              </span>
                        </div>

                        <div
                            className={`menu-item ${activeTab === 'statistics' ? 'active' : ''}`}
                            onClick={() => setActiveTab('statistics')}
                        >
                            <i className="fas fa-chart-bar nav-item-icon"></i>
                            <span className={`${!sidebarOpen && 'md:hidden'}`}>Statistiques</span>
                        </div>

                        <div className={`px-4 py-2 mt-6 text-xs uppercase text-gray-500 ${!sidebarOpen && 'md:hidden'}`}>
                            Paramètres
                        </div>

                        <div
                            className={`menu-item ${activeTab === 'settings' ? 'active' : ''}`}
                            onClick={() => setActiveTab('settings')}
                        >
                            <i className="fas fa-cog nav-item-icon"></i>
                            <span className={`${!sidebarOpen && 'md:hidden'}`}>Paramètres</span>
                        </div>

                        <div
                            className={`menu-item ${activeTab === 'profile' ? 'active' : ''}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            <i className="fas fa-user-cog nav-item-icon"></i>
                            <span className={`${!sidebarOpen && 'md:hidden'}`}>Profil</span>
                        </div>
                    </nav>
                </div>

                {/* Sidebar Footer */}
                <div className="mt-auto border-t border-gray-700 p-4">
                    <Link
                        to="/login/admin"
                        className="flex items-center text-gray-300 hover:text-white"
                    >
                        <i className="fas fa-sign-out-alt mr-3"></i>
                        <span className={`${!sidebarOpen && 'md:hidden'}`}>Se déconnecter</span>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 ${
                sidebarOpen ? "md:ml-64" : "md:ml-20"
            }`}>
                {/* Top Navigation */}
                <nav className="bg-white shadow-sm">
                    <div className="mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <button
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    className="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none hidden md:block"
                                >
                                    <i className={`fas ${sidebarOpen ? 'fa-chevron-left' : 'fa-bars'}`}></i>
                                </button>
                                <button
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    className="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none md:hidden"
                                >
                                    <i className="fas fa-bars"></i>
                                </button>

                                <div className="ml-4 lg:ml-8">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <i className="fas fa-search text-gray-400"></i>
                                        </div>
                                        <input
                                            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                                            type="search"
                                            placeholder="Rechercher..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <button className="p-1 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none">
                                        <i className="fas fa-bell text-xl"></i>
                                        <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs text-center">
                      5
                    </span>
                                    </button>
                                </div>

                                <div className="relative">
                                    <button className="p-1 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none">
                                        <i className="fas fa-envelope text-xl"></i>
                                        <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs text-center">
                      3
                    </span>
                                    </button>
                                </div>

                                <div className="flex items-center">
                                    <img
                                        className="h-8 w-8 rounded-full object-cover"
                                        src="/images/admin-avatar.jpg"
                                        alt="Admin"
                                    />
                                    <div className="ml-2 hidden md:block">
                                        <div className="text-sm font-medium text-gray-900">Admin User</div>
                                        <div className="text-xs text-gray-500">Super Administrateur</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Page Content */}
                <main className="p-4 sm:p-6 lg:p-8">
                    {/* Dashboard Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord administrateur</h1>
                        <div className="mt-4 md:mt-0 flex space-x-3">
                            <button className="dashboard-btn btn-outline">
                                <i className="fas fa-calendar-alt mr-2"></i>
                                <span>Mars 2023</span>
                            </button>
                            <button className="dashboard-btn btn-primary">
                                <i className="fas fa-filter mr-2"></i>
                                <span>Filtres</span>
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
                        {stats.map(stat => (
                            <div key={stat.id} className="stat-card animate-fadeIn">
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
                                        <div className="stat-value">{stat.count.toLocaleString()}</div>
                                        <div className={stat.increase >= 0 ? 'trend-positive' : 'trend-negative'}>
                                            <i className={`fas ${stat.increase >= 0 ? 'fa-arrow-up' : 'fa-arrow-down'} mr-1`}></i>
                                            <span>{Math.abs(stat.increase)}%</span>
                                            <span className="text-gray-500 ml-1">vs dernier mois</span>
                                        </div>
                                    </div>
                                    <div className={`${stat.color} rounded-lg h-14 w-14 flex items-center justify-center text-white`}>
                                        <i className={`fas ${stat.icon} fa-lg`}></i>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {/* User Registration Chart */}
                        <div className="dashboard-card animate-fadeIn">
                            <div className="card-header">
                                <h3 className="card-title">Progression des Inscriptions</h3>
                                <div className="flex space-x-2">
                                    <select className="text-sm border border-gray-200 rounded-md bg-white px-3 py-1">
                                        <option>Cette année</option>
                                        <option>Ce trimestre</option>
                                        <option>Ce mois</option>
                                    </select>
                                    <button className="btn-icon">
                                        <i className="fas fa-sync-alt"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="h-64 flex items-end space-x-2 pt-5 px-1">
                                <div className="flex-1 flex flex-col items-center">
                                    <div className="chart-bar bg-primary h-3/4 w-16 md:w-10"></div>
                                    <div className="mt-2 text-xs text-gray-500">Jan</div>
                                </div>
                                <div className="flex-1 flex flex-col items-center">
                                    <div className="chart-bar bg-primary h-1/2 w-16 md:w-10"></div>
                                    <div className="mt-2 text-xs text-gray-500">Fév</div>
                                </div>
                                <div className="flex-1 flex flex-col items-center">
                                    <div className="chart-bar bg-primary h-2/3 w-16 md:w-10"></div>
                                    <div className="mt-2 text-xs text-gray-500">Mar</div>
                                </div>
                                <div className="flex-1 flex flex-col items-center">
                                    <div className="chart-bar bg-primary h-4/5 w-16 md:w-10"></div>
                                    <div className="mt-2 text-xs text-gray-500">Avr</div>
                                </div>
                                <div className="flex-1 flex flex-col items-center">
                                    <div className="chart-bar bg-primary h-3/5 w-16 md:w-10"></div>
                                    <div className="mt-2 text-xs text-gray-500">Mai</div>
                                </div>
                                <div className="flex-1 flex flex-col items-center">
                                    <div className="chart-bar bg-primary h-4/5 w-16 md:w-10"></div>
                                    <div className="mt-2 text-xs text-gray-500">Jun</div>
                                </div>
                            </div>
                            <div className="flex justify-center mt-4 space-x-6">
                                <div className="chart-legend-item">
                                    <div className="chart-legend-color bg-primary"></div>
                                    <span>Étudiants</span>
                                </div>
                                <div className="chart-legend-item">
                                    <div className="chart-legend-color bg-secondary"></div>
                                    <span>Entreprises</span>
                                </div>
                            </div>
                        </div>

                        {/* Internship Distribution Chart */}
                        <div className="dashboard-card animate-fadeIn">
                            <div className="card-header">
                                <h3 className="card-title">Offres vs Candidatures</h3>
                                <div className="flex space-x-2">
                                    <select className="text-sm border border-gray-200 rounded-md bg-white px-3 py-1">
                                        <option>Cette année</option>
                                        <option>Ce trimestre</option>
                                        <option>Ce mois</option>
                                    </select>
                                    <button className="btn-icon">
                                        <i className="fas fa-sync-alt"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-center items-center h-64">
                                {/* Simple placeholder for pie chart */}
                                <div className="relative h-48 w-48">
                                    <div className="absolute inset-0 bg-blue-500 rounded-full"></div>
                                    <div className="absolute inset-0 bg-yellow-500 rounded-full" style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%, 50% 50%)' }}></div>
                                    <div className="absolute inset-0 bg-green-500 rounded-full" style={{ clipPath: 'polygon(50% 0, 0 0, 0 50%, 50% 50%)' }}></div>
                                    <div className="pie-center">156</div>
                                </div>
                            </div>
                            <div className="flex justify-center mt-4 space-x-4">
                                <div className="chart-legend-item">
                                    <div className="chart-legend-color bg-blue-500"></div>
                                    <span>Stages publiés</span>
                                </div>
                                <div className="chart-legend-item">
                                    <div className="chart-legend-color bg-yellow-500"></div>
                                    <span>Candidatures</span>
                                </div>
                                <div className="chart-legend-item">
                                    <div className="chart-legend-color bg-green-500"></div>
                                    <span>Acceptées</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tables */}
                    <div className="grid grid-cols-1 gap-6 mb-6">
                        {/* Recent Users Table */}
                        <div className="dashboard-card animate-fadeIn">
                            <div className="card-header">
                                <h3 className="card-title">Nouveaux utilisateurs</h3>
                                <button className="text-primary hover:text-primary-600 text-sm font-medium flex items-center">
                                    <span>Tout voir</span>
                                    <i className="fas fa-arrow-right ml-2"></i>
                                </button>
                            </div>
                            <div className="table-container">
                                <table className="dashboard-table">
                                    <thead className="table-header">
                                    <tr>
                                        <th className="table-th">Utilisateur</th>
                                        <th className="table-th">Type</th>
                                        <th className="table-th">Date d'inscription</th>
                                        <th className="table-th">Statut</th>
                                        <th className="table-th">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {recentUsers.map((user) => (
                                        <tr key={user.id}>
                                            <td className="table-td">
                                                <div className="flex items-center">
                                                    <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                                                        user.type === 'student' ? 'bg-primary-100 text-primary' : 'bg-secondary-100 text-secondary'
                                                    }`}>
                                                        <i className={`fas ${user.type === 'student' ? 'fa-user-graduate' : 'fa-building'}`}></i>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                        <div className="text-sm text-gray-500">{user.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="table-td">
                          <span className={`badge ${
                              user.type === 'student' ? 'badge-primary' : 'badge-secondary'
                          }`}>
                            {user.type === 'student' ? 'Étudiant' : 'Entreprise'}
                          </span>
                                            </td>
                                            <td className="table-td">
                                                <div className="text-sm text-gray-900">{user.date}</div>
                                            </td>
                                            <td className="table-td">
                          <span className={`badge ${
                              user.status === 'Active' ? 'badge-success' : 'badge-warning'
                          }`}>
                            {user.status === 'Active' ? 'Actif' : 'En attente'}
                          </span>
                                            </td>
                                            <td className="table-td">
                                                <div className="flex space-x-2">
                                                    <button className="action-btn-view">
                                                        <i className="fas fa-eye"></i>
                                                    </button>
                                                    <button className="action-btn-edit">
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <button className="action-btn-delete">
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Recent Internships Table */}
                        <div className="dashboard-card animate-fadeIn">
                            <div className="card-header">
                                <h3 className="card-title">Stages récemment publiés</h3>
                                <button className="text-primary hover:text-primary-600 text-sm font-medium flex items-center">
                                    <span>Tout voir</span>
                                    <i className="fas fa-arrow-right ml-2"></i>
                                </button>
                            </div>
                            <div className="table-container">
                                <table className="dashboard-table">
                                    <thead className="table-header">
                                    <tr>
                                        <th className="table-th">Intitulé du stage</th>
                                        <th className="table-th">Entreprise</th>
                                        <th className="table-th">Candidatures</th>
                                        <th className="table-th">Date limite</th>
                                        <th className="table-th">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {upcomingInternships.map((internship) => (
                                        <tr key={internship.id}>
                                            <td className="table-td font-medium text-gray-900">{internship.title}</td>
                                            <td className="table-td text-gray-500">{internship.company}</td>
                                            <td className="table-td">
                                                <div className="flex flex-col">
                                                    <span className="text-primary font-medium">{internship.applicants}</span>
                                                    <span className="text-xs text-gray-500">candidats</span>
                                                </div>
                                            </td>
                                            <td className="table-td">
                                                <div className="flex items-center text-gray-500">
                                                    <i className="far fa-calendar-alt mr-2"></i>
                                                    <span>{internship.deadline}</span>
                                                </div>
                                            </td>
                                            <td className="table-td">
                                                <div className="flex space-x-2">
                                                    <button className="action-btn-view">
                                                        <i className="fas fa-eye"></i>
                                                    </button>
                                                    <button className="action-btn-edit">
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <button className="action-btn-delete">
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="mt-8 py-4 border-t border-gray-200">
                        <p className="text-center text-sm text-gray-500">
                            &copy; {new Date().getFullYear()} TalentBridge. Tous droits réservés.
                        </p>
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;