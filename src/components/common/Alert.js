import React, { useState } from 'react';
import '../../styles/base.css';

const Alert = ({
                   type = 'info',
                   message,
                   dismissible = true,
                   onDismiss
               }) => {
    const [visible, setVisible] = useState(true);

    const alertClass = `alert alert-${type}`;

    const handleDismiss = () => {
        setVisible(false);
        if (onDismiss) onDismiss();
    };

    if (!visible) return null;

    return (
        <div className={alertClass} role="alert">
            <div className="alert-content">{message}</div>
            {dismissible && (
                <button
                    className="alert-close"
                    onClick={handleDismiss}
                    aria-label="Close"
                >
                    &times;
                </button>
            )}
        </div>
    );
};

export default Alert;