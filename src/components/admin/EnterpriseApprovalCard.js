import React from 'react';
import '../../styles/base.css';

const EnterpriseApprovalCard = ({
                                    enterprise,
                                    onApprove,
                                    onReject,
                                    onViewDetails
                                }) => {
    const {
        id,
        name,
        domain,
        contactName,
        contactEmail,
        submissionDate,
        status = 'pending', // pending, approved, rejected
        logoUrl
    } = enterprise;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusBadgeClass = () => {
        switch(status) {
            case 'approved':
                return 'badge-success';
            case 'rejected':
                return 'badge-error';
            default:
                return 'badge-warning';
        }
    };

    const isPending = status === 'pending';

    return (
        <div className="enterprise-card">
            <div className="enterprise-card-header">
                <div className="enterprise-card-logo">
                    {logoUrl ? (
                        <img src={logoUrl} alt={`${name} logo`} />
                    ) : (
                        <div className="enterprise-card-logo-placeholder">
                            {name.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
                <div className="enterprise-card-title">
                    <h3>{name}</h3>
                    <a href={`https://${domain}`} target="_blank" rel="noopener noreferrer">
                        {domain}
                    </a>
                </div>
                <div className="enterprise-card-status">
                    <span className={`badge ${getStatusBadgeClass()}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                </div>
            </div>

            <div className="enterprise-card-content">
                <div className="enterprise-card-detail">
                    <strong>Contact:</strong> {contactName}
                </div>
                <div className="enterprise-card-detail">
                    <strong>Email:</strong> {contactEmail}
                </div>
                <div className="enterprise-card-detail">
                    <strong>Submitted:</strong> {formatDate(submissionDate)}
                </div>
            </div>

            <div className="enterprise-card-actions">
                <button
                    className="button button-outline"
                    onClick={() => onViewDetails(id)}
                >
                    View Details
                </button>

                {isPending && (
                    <>
                        <button
                            className="button button-success"
                            onClick={() => onApprove(id)}
                        >
                            Approve
                        </button>
                        <button
                            className="button button-error"
                            onClick={() => onReject(id)}
                        >
                            Reject
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default EnterpriseApprovalCard;