import React from 'react';
import '../../styles/base.css';

const Button = ({
                    children,
                    type = 'button',
                    variant = 'primary',
                    size = 'medium',
                    disabled = false,
                    fullWidth = false,
                    onClick,
                    className = '',
                    ...props
                }) => {
    const buttonClass = `button button-${variant} button-${size} ${fullWidth ? 'button-full' : ''} ${className}`.trim();

    return (
        <button
            type={type}
            className={buttonClass}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;