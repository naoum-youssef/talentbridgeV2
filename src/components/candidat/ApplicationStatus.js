import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ApplicationStatus = ({ applicationId }) => {
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Status mapping for visual representation
    const statusMap = {
        'applied': { color: 'blue', icon: 'fas fa-paper-plane', text: 'Applied' },
        'reviewing': { color: 'yellow', icon: 'fas fa-search', text: 'Under Review' },
        'interviewed': { color: 'purple', icon: 'fas fa-comments', text: 'Interviewed' },
        'offered': { color: 'green', icon: 'fas fa-handshake', text: 'Offer Extended' },
        'hired': { color: 'green', icon: 'fas fa-check-circle', text: 'Hired' },
        'rejected': { color: 'red', icon: 'fas fa-times-circle', text: 'Not Selected' },
        'withdrawn': { color: 'gray', icon: 'fas fa-undo', text: 'Application Withdrawn' }
    };

    // Fetch application data
    useEffect(() => {
        const fetchApplication = async () => {
            try {
                setLoading(true);
                // Replace with your API endpoint
                const response = await axios.get(`/api/candidat/applications/${applicationId}`);
                setApplication(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching application:', err);
                setError('Failed to load application data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (applicationId) {
            fetchApplication();
        }
    }, [applicationId]);

    // Calculate days since application
    const getDaysSinceApplication = (date) => {
        const applicationDate = new Date(date);
        const today = new Date();
        const diffTime = Math.abs(today - applicationDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    // Format date for display
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Handle application withdrawal
    const handleWithdraw = async () => {
        if (window.confirm('Are you sure you want to withdraw this application?')) {
            try {
                // Replace with your API endpoint
                await axios.put(`/api/candidat/applications/${applicationId}/withdraw`);
                // Update local state to show withdrawn status
                setApplication(prev => ({
                    ...prev,
                    status: 'withdrawn'
                }));
            } catch (err) {
                console.error('Error withdrawing application:', err);
                alert('Failed to withdraw application. Please try again later.');
            }
        }
    };

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6 flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-red-600 flex items-center">
                    <i className="fas fa-exclamation-circle mr-2"></i>
                    {error}
                </div>
            </div>
        );
    }

    // If no application data or ID provided
    if (!application) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600">No application data available.</p>
            </div>
        );
    }

    const {
        job = {},
        appliedDate = new Date(),
        status = 'applied',
        lastUpdated = new Date(),
        notes = ''
    } = application;

    const statusInfo = statusMap[status] || statusMap.applied;
    const statusColorClasses = {
        blue: 'bg-blue-100 text-blue-800 border-blue-300',
        yellow: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        green: 'bg-green-100 text-green-800 border-green-300',
        red: 'bg-red-100 text-red-800 border-red-300',
        purple: 'bg-purple-100 text-purple-800 border-purple-300',
        gray: 'bg-gray-100 text-gray-800 border-gray-300'
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                    <p className="text-gray-600">{job.company} • {job.location}</p>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusColorClasses[statusInfo.color]}`}>
          <i className={`${statusInfo.icon} mr-1`}></i>
                    {statusInfo.text}
        </span>
            </div>

            <div className="mb-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
          <span className="mr-4">
            <i className="far fa-calendar-alt mr-1"></i>
            Applied on {formatDate(appliedDate)}
          </span>
                    <span>
            <i className="far fa-clock mr-1"></i>
                        {getDaysSinceApplication(appliedDate)} days ago
          </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div
                        className={`h-2.5 rounded-full ${
                            status === 'rejected' || status === 'withdrawn'
                                ? 'bg-red-500'
                                : 'bg-blue-500'
                        }`}
                        style={{
                            width: status === 'applied' ? '20%' :
                                status === 'reviewing' ? '40%' :
                                    status === 'interviewed' ? '60%' :
                                        status === 'offered' ? '80%' :
                                            status === 'hired' ? '100%' : '100%'
                        }}
                    ></div>
                </div>

                <div className="flex justify-between mb-2 text-xs text-gray-500">
                    <span>Applied</span>
                    <span>Review</span>
                    <span>Interview</span>
                    <span>Offer</span>
                    <span>Hired</span>
                </div>
            </div>

            {notes && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                    <h4 className="font-semibold text-yellow-800 mb-2">Notes from Employer</h4>
                    <p className="text-yellow-900">{notes}</p>
                </div>
            )}

            <div className="flex justify-between items-center">
                <Link
                    to={`/candidat/jobs/${job._id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                >
                    View Job Details
                </Link>

                {/* Only show withdraw button if application is not rejected, withdrawn, or hired */}
                {!['rejected', 'withdrawn', 'hired'].includes(status) && (
                    <button
                        onClick={handleWithdraw}
                        className="text-red-600 hover:text-red-800 font-medium"
                    >
                        Withdraw Application
                    </button>
                )}

                {/* Show reapply button if application was rejected more than 90 days ago */}
                {status === 'rejected' && getDaysSinceApplication(lastUpdated) > 90 && (
                    <Link
                        to={`/candidat/apply/${job._id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                        Reapply
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ApplicationStatus;