import React, { useState } from 'react';
import '../../styles/base.css';

const CandidateCard = ({ candidate, jobTitle, applicationStatus, applicationDate, onScheduleInterview, onChangeStatus, onDownloadResume }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Format date for display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
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

    // Status options for changing application status
    const statusOptions = [
        { value: 'new', label: 'New' },
        { value: 'reviewing', label: 'Reviewing' },
        { value: 'interview', label: 'Interview' },
        { value: 'shortlisted', label: 'Shortlisted' },
        { value: 'rejected', label: 'Rejected' },
        { value: 'hired', label: 'Hired' }
    ];

    return (
        <div className={`candidate-card ${isExpanded ? 'expanded' : ''}`}>
            <div className="candidate-card-header" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="candidate-info">
                    <div className="candidate-avatar">
                        {candidate.avatar ? (
                            <img src={candidate.avatar} alt={`${candidate.firstName} ${candidate.lastName}`} />
                        ) : (
                            <div className="avatar-placeholder">
                                {candidate.firstName.charAt(0)}{candidate.lastName.charAt(0)}
                            </div>
                        )}
                    </div>

                    <div className="candidate-name-info">
                        <h3>{candidate.firstName} {candidate.lastName}</h3>
                        <p className="candidate-title">{candidate.title || 'Candidate'}</p>
                    </div>
                </div>

                <div className="candidate-application-info">
                    <div className="job-applied">
                        <span className="job-label">Applied for:</span>
                        <span className="job-title">{jobTitle}</span>
                    </div>

                    <div className="application-date">
                        <span className="date-label">Date:</span>
                        <span className="date-value">{formatDate(applicationDate)}</span>
                    </div>

                    <div className="application-status">
            <span className={`status-badge ${getStatusBadgeClass(applicationStatus)}`}>
              {applicationStatus.charAt(0).toUpperCase() + applicationStatus.slice(1)}
            </span>
                    </div>

                    <button className="expand-button">
                        {isExpanded ? '▲' : '▼'}
                    </button>
                </div>
            </div>

            {isExpanded && (
                <div className="candidate-card-content">
                    <div className="candidate-details">
                        <div className="detail-section contact-info">
                            <h4>Contact Information</h4>
                            <p>
                                <span className="icon">📧</span>
                                <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
                            </p>
                            {candidate.phone && (
                                <p>
                                    <span className="icon">📱</span>
                                    <a href={`tel:${candidate.phone}`}>{candidate.phone}</a>
                                </p>
                            )}
                            {candidate.location && (
                                <p>
                                    <span className="icon">📍</span>
                                    {candidate.location}
                                </p>
                            )}
                        </div>

                        <div className="detail-section skills">
                            <h4>Skills</h4>
                            <div className="skills-list">
                                {candidate.skills && candidate.skills.map((skill, index) => (
                                    <span key={index} className="skill-tag">{skill}</span>
                                ))}
                                {(!candidate.skills || candidate.skills.length === 0) && (
                                    <p className="no-data">No skills listed</p>
                                )}
                            </div>
                        </div>

                        <div className="detail-section experience">
                            <h4>Experience</h4>
                            {candidate.experience && candidate.experience.map((exp, index) => (
                                <div key={index} className="experience-item">
                                    <h5>{exp.title} at {exp.company}</h5>
                                    <p className="experience-date">
                                        {exp.startDate} - {exp.endDate || 'Present'}
                                    </p>
                                    <p className="experience-description">{exp.description}</p>
                                </div>
                            ))}
                            {(!candidate.experience || candidate.experience.length === 0) && (
                                <p className="no-data">No experience listed</p>
                            )}
                        </div>

                        <div className="detail-section education">
                            <h4>Education</h4>
                            {candidate.education && candidate.education.map((edu, index) => (
                                <div key={index} className="education-item">
                                    <h5>{edu.degree}</h5>
                                    <p>{edu.institution}, {edu.year}</p>
                                </div>
                            ))}
                            {(!candidate.education || candidate.education.length === 0) && (
                                <p className="no-data">No education listed</p>
                            )}
                        </div>
                    </div>

                    <div className="candidate-actions">
                        <div className="action-buttons">
                            <button
                                className="btn-primary"
                                onClick={() => onScheduleInterview(candidate.id)}
                            >
                                Schedule Interview
                            </button>

                            <button
                                className="btn-secondary"
                                onClick={() => onDownloadResume(candidate.id)}
                            >
                                Download Resume
                            </button>
                        </div>

                        <div className="status-change">
                            <label htmlFor={`status-${candidate.id}`}>Update Status:</label>
                            <select
                                id={`status-${candidate.id}`}
                                value={applicationStatus}
                                onChange={(e) => onChangeStatus(candidate.id, e.target.value)}
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
            )}
        </div>
    );
};

export default CandidateCard;