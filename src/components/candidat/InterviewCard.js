import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const InterviewCard = ({ interview }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [confirmationStatus, setConfirmationStatus] = useState(interview?.confirmed || false);
    const [loading, setLoading] = useState(false);

    // Default values if interview prop is not provided
    const {
        _id = '',
        jobId = '',
        jobTitle = 'Software Developer',
        company = 'Tech Company',
        interviewType = 'Video Call',
        interviewDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        duration = 60, // in minutes
        interviewers = [
            { name: 'John Doe', title: 'HR Manager' },
            { name: 'Jane Smith', title: 'Senior Developer' }
        ],
        location = 'Zoom Meeting',
        meetingLink = 'https://zoom.us/j/1234567890',
        instructions = 'Please prepare a brief introduction about yourself and your experience with React and Node.js',
        confirmed = false,
        status = 'scheduled' // scheduled, completed, cancelled, rescheduled
    } = interview || {};

    // Format date for display
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Format time for display
    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Calculate days until interview
    const getDaysUntilInterview = () => {
        const today = new Date();
        const interview = new Date(interviewDate);
        const diffTime = interview - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    // Handle interview confirmation
    const handleConfirmation = async () => {
        try {
            setLoading(true);
            // Replace with your API endpoint
            await axios.put(`/api/candidat/interviews/${_id}/confirm`);
            setConfirmationStatus(true);
        } catch (error) {
            console.error('Error confirming interview:', error);
            alert('Failed to confirm interview. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Get status badge styling
    const getStatusBadge = () => {
        const statusStyles = {
            scheduled: 'bg-blue-100 text-blue-800 border-blue-300',
            completed: 'bg-green-100 text-green-800 border-green-300',
            cancelled: 'bg-red-100 text-red-800 border-red-300',
            rescheduled: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        };

        const statusIcons = {
            scheduled: 'fas fa-calendar-check',
            completed: 'fas fa-check-circle',
            cancelled: 'fas fa-times-circle',
            rescheduled: 'fas fa-calendar-alt',
        };

        return {
            className: statusStyles[status] || statusStyles.scheduled,
            icon: statusIcons[status] || statusIcons.scheduled
        };
    };

    const statusBadge = getStatusBadge();
    const daysUntil = getDaysUntilInterview();
    const isUpcoming = daysUntil > 0 && status === 'scheduled';

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{jobTitle}</h3>
                        <p className="text-gray-600">{company}</p>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusBadge.className}`}>
            <i className={`${statusBadge.icon} mr-1`}></i>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
                </div>

                <div className="flex flex-wrap -mx-2 mb-4">
                    <div className="px-2 w-full sm:w-1/2 mb-2 sm:mb-0">
                        <div className="flex items-center text-gray-700">
                            <i className="far fa-calendar-alt mr-2 text-gray-500"></i>
                            <span>{formatDate(interviewDate)}</span>
                        </div>
                    </div>
                    <div className="px-2 w-full sm:w-1/2">
                        <div className="flex items-center text-gray-700">
                            <i className="far fa-clock mr-2 text-gray-500"></i>
                            <span>{formatTime(interviewDate)} ({duration} minutes)</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap -mx-2 mb-4">
                    <div className="px-2 w-full sm:w-1/2 mb-2 sm:mb-0">
                        <div className="flex items-center text-gray-700">
                            <i className="fas fa-video mr-2 text-gray-500"></i>
                            <span>{interviewType}</span>
                        </div>
                    </div>
                    <div className="px-2 w-full sm:w-1/2">
                        <div className="flex items-center text-gray-700">
                            <i className="fas fa-map-marker-alt mr-2 text-gray-500"></i>
                            <span>{location}</span>
                        </div>
                    </div>
                </div>

                {isUpcoming && !confirmationStatus && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
                        <p className="text-yellow-800 flex items-center">
                            <i className="fas fa-exclamation-circle mr-2"></i>
                            Please confirm your attendance for this interview
                        </p>
                    </div>
                )}

                {/* Collapsible details section */}
                {showDetails && (
                    <div className="border-t border-gray-200 pt-4 mt-4 animate-fade-in">
                        <h4 className="font-semibold text-gray-800 mb-2">Interviewers</h4>
                        <div className="mb-4">
                            {interviewers.map((interviewer, index) => (
                                <div key={index} className="flex items-center mb-2 last:mb-0">
                                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-sm font-semibold">{interviewer.name.charAt(0)}</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">{interviewer.name}</p>
                                        <p className="text-sm text-gray-600">{interviewer.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {instructions && (
                            <div className="mb-4">
                                <h4 className="font-semibold text-gray-800 mb-2">Preparation Instructions</h4>
                                <p className="text-gray-700 bg-gray-50 p-3 rounded-md">{instructions}</p>
                            </div>
                        )}

                        {interviewType === 'Video Call' && meetingLink && (
                            <div className="mb-4">
                                <h4 className="font-semibold text-gray-800 mb-2">Meeting Link</h4>
                                <a
                                    href={meetingLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 flex items-center"
                                >
                                    <i className="fas fa-external-link-alt mr-2"></i>
                                    Join Meeting
                                </a>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="bg-gray-50 px-5 py-3 flex justify-between items-center border-t border-gray-200">
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-gray-700 hover:text-gray-900 font-medium flex items-center"
                >
                    {showDetails ? (
                        <>
                            <i className="fas fa-chevron-up mr-1"></i>
                            Hide Details
                        </>
                    ) : (
                        <>
                            <i className="fas fa-chevron-down mr-1"></i>
                            Show Details
                        </>
                    )}
                </button>

                <div>
                    {isUpcoming && !confirmationStatus ? (
                        <button
                            onClick={handleConfirmation}
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                        >
                            {loading ? 'Confirming...' : 'Confirm Attendance'}
                        </button>
                    ) : isUpcoming ? (
                        <Link
                            to={`/candidat/calendar`}
                            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center"
                        >
                            <i className="fas fa-calendar-plus mr-1"></i>
                            Add to Calendar
                        </Link>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default InterviewCard;