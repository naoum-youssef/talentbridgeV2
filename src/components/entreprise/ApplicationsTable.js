import React, { useState } from 'react';
import '../../styles/base.css';

const ApplicationsTable = ({ applications = [], onViewApplication, onChangeStatus }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortConfig, setSortConfig] = useState({ key: 'appliedDate', direction: 'descending' });

    // Status options for the filter dropdown
    const statusOptions = [
        { value: 'all', label: 'All Applications' },
        { value: 'new', label: 'New' },
        { value: 'reviewing', label: 'Reviewing' },
        { value: 'interview', label: 'Interview' },
        { value: 'shortlisted', label: 'Shortlisted' },
        { value: 'rejected', label: 'Rejected' },
        { value: 'hired', label: 'Hired' }
    ];

    // Status options for changing individual application status
    const applicationStatusOptions = [
        { value: 'new', label: 'New' },
        { value: 'reviewing', label: 'Reviewing' },
        { value: 'interview', label: 'Interview' },
        { value: 'shortlisted', label: 'Shortlisted' },
        { value: 'rejected', label: 'Rejected' },
        { value: 'hired', label: 'Hired' }
    ];

    // Format date for display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    };

    // Handle sorting
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Get sorted and filtered applications
    const getSortedApplications = () => {
        // Filter by search term and status
        let filteredApplications = [...applications];

        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filteredApplications = filteredApplications.filter(app =>
                app.candidateName.toLowerCase().includes(searchLower) ||
                app.jobTitle.toLowerCase().includes(searchLower)
            );
        }

        if (statusFilter !== 'all') {
            filteredApplications = filteredApplications.filter(app =>
                app.status === statusFilter
            );
        }

        // Sort applications
        return filteredApplications.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    };

    // Get status badge class based on status
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'new': return 'status-badge-new';
            case 'reviewing': return 'status-badge-reviewing';
            case 'interview': return 'status-badge-interview';
            case 'shortlisted': return 'status-badge-shortlisted';
            case 'rejected': return 'status-badge-rejected';
            case 'hired': return 'status-badge-hired';
            default: return '';
        }
    };

    const sortedApplications = getSortedApplications();

    return (
        <div className="applications-table-container">
            <div className="table-header">
                <h2>Job Applications</h2>

                <div className="table-filters">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search by candidate or job title..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="filter-container">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="status-filter"
                        >
                            {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {sortedApplications.length === 0 ? (
                <div className="no-applications">
                    <p>No applications match your current filters.</p>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="applications-table">
                        <thead>
                        <tr>
                            <th onClick={() => requestSort('candidateName')}>
                                Candidate Name
                                {sortConfig.key === 'candidateName' && (
                                    <span className="sort-indicator">
                      {sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}
                    </span>
                                )}
                            </th>
                            <th onClick={() => requestSort('jobTitle')}>
                                Job Title
                                {sortConfig.key === 'jobTitle' && (
                                    <span className="sort-indicator">
                      {sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}
                    </span>
                                )}
                            </th>
                            <th onClick={() => requestSort('appliedDate')}>
                                Applied Date
                                {sortConfig.key === 'appliedDate' && (
                                    <span className="sort-indicator">
                      {sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}
                    </span>
                                )}
                            </th>
                            <th onClick={() => requestSort('status')}>
                                Status
                                {sortConfig.key === 'status' && (
                                    <span className="sort-indicator">
                      {sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}
                    </span>
                                )}
                            </th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sortedApplications.map((application) => (
                            <tr key={application.id}>
                                <td>{application.candidateName}</td>
                                <td>{application.jobTitle}</td>
                                <td>{formatDate(application.appliedDate)}</td>
                                <td>
                    <span className={`status-badge ${getStatusBadgeClass(application.status)}`}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                                </td>
                                <td className="actions-cell">
                                    <button
                                        className="btn-view"
                                        onClick={() => onViewApplication(application.id)}
                                    >
                                        View
                                    </button>

                                    <select
                                        value={application.status}
                                        onChange={(e) => onChangeStatus(application.id, e.target.value)}
                                        className="status-select"
                                    >
                                        {applicationStatusOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ApplicationsTable;