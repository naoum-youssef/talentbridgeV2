import React from 'react';
import '../../styles/base.css';

const Loader = ({ size = 'medium', color = 'primary' }) => {
    const loaderClass = `loader loader-${size} loader-${color}`;

    return (
        <div className={loaderClass}>
            <div className="loader-spinner"></div>
        </div>
    );
};

export default Loader;