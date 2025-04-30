import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const MyApplications = () => {
    const { currentUser } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('dateDesc');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/candidates/applications`, {
                    params: {
                        candidateId: currentUser.id,
                        status: filter !== 'all' ? filter : undefined,
                        page: currentPage,
                        limit: itemsPerPage,
                        sort: sortBy
                    }
                });

                setApplications(response.data.applications);
                setTotalPages(Math.ceil(response.data.total / itemsPerPage));
                setLoading(false);
            } catch (err) {
                setError('Failed to load applications. Please try again later.');
                setLoading(false);
            }
        };

        if (currentUser?.id) {
            fetchApplications();
        }
    }, [currentUser, filter, sortBy, currentPage, itemsPerPage]);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1);
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        setCurrentPage(1);
    };

    const handleWithdraw = async (applicationId) => {
        if (window.confirm('Are you sure you want to withdraw this application?')) {
            try {
                await axios.put(`/api/candidates/applications/${applicationId}/withdraw`);

                // Update local state to reflect the change
                setApplications(prevApplications =>
                    prevApplications.map(app =>
                        app.id === applicationId
                            ? { ...app, status: 'withdrawn', statusDate: new Date().toISOString() }
                            : app
                    )
                );
            } catch (err) {
                setError('Failed to withdraw application. Please try again later.');
            }
        }
    };

    const getStatusBadgeClass = (status) => {
        switch (status.toLowerCase()) {
            case 'applied':
                return 'bg-blue-100 text-blue-800';
            case 'reviewing':
                return 'bg-yellow-100 text-yellow-800';
            case 'interview':
                return 'bg-purple-100 text-purple-800';
            case 'offer':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            case 'withdrawn':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading applications...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">My Applications</h1>

            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

            <div className="flex flex-col md:flex-row justify-between mb-6">
                <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-0">
                    <div>
                        <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
                        <select
                            id="filter"
                            value={filter}
                            onChange={handleFilterChange}
                            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Applications</option>
                            <option value="applied">Applied</option>
                            <option value="reviewing">Reviewing</option>
                            <option value="interview">Interview</option>
                            <option value="offer">Offer</option>
                            <option value="rejected">Rejected</option>
                            <option value="withdrawn">Withdrawn</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
                        <select
                            id="sortBy"
                            value={sortBy}
                            onChange={handleSortChange}
                            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="dateDesc">Newest First</option>
                            <option value="dateAsc">Oldest First</option>
                            <option value="company">Company Name</option>
                            <option value="status">Application Status</option>
                        </select>
                    </div>
                </div>

                <div className="text-right">
                    <Link
                        to="/candidat/job-listings"
                        className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Find More Jobs
                    </Link>
                </div>
            </div>

            {applications.length === 0 ? (
                <div className="bg-white shadow-md rounded-lg p-6 text-center">
                    <p className="text-gray-500 mb-4">You haven't applied to any jobs yet.</p>
                    <Link
                        to="/candidat/job-listings"
                        className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Browse Available Jobs
                    </Link>
                </div>
            ) : (
                <>
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Job
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Company
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Applied Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Last Updated
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {applications.map((application) => (
                                <tr key={application.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link
                                            to={`/jobs/${application.jobId}`}
                                            className="text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            {application.jobTitle}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {application.companyName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(application.status)}`}>
                        {application.status}
                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {formatDate(application.appliedDate)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {formatDate(application.statusDate)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex space-x-2">
                                            <Link
                                                to={`/candidat/applications/${application.id}`}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                View
                                            </Link>
                                            {['applied', 'reviewing', 'interview'].includes(application.status.toLowerCase()) && (
                                                <button
                                                    onClick={() => handleWithdraw(application.id)}
                                                    className="text-red-600 hover:text-red-800 ml-2"
                                                >
                                                    Withdraw
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-6">
                            <nav className="flex items-center">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 rounded border mr-2 disabled:opacity-50"
                                >
                                    Previous
                                </button>

                                {[...Array(totalPages).keys()].map(page => (
                                    <button
                                        key={page + 1}
                                        onClick={() => setCurrentPage(page + 1)}
                                        className={`px-3 py-1 mx-1 rounded ${
                                            currentPage === page + 1
                                                ? 'bg-blue-600 text-white'
                                                : 'border hover:bg-gray-100'
                                        }`}
                                    >
                                        {page + 1}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 rounded border ml-2 disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </nav>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default MyApplications;