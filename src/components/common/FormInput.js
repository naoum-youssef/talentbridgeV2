import React from 'react';
import '../../styles/base.css';

const FormInput = ({
                       label,
                       name,
                       type = 'text',
                       value,
                       placeholder = '',
                       required = false,
                       disabled = false,
                       error = '',
                       onChange,
                       className = '',
                       ...props
                   }) => {
    const inputId = `input-${name}`;
    const inputClass = `form-input ${error ? 'form-input-error' : ''} ${className}`.trim();

    return (
        <div className="form-group">
            {label && (
                <label htmlFor={inputId} className="form-label">
                    {label}
                    {required && <span className="form-required">*</span>}
                </label>
            )}
            <input
                id={inputId}
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                onChange={onChange}
                className={inputClass}
                {...props}
            />
            {error && <div className="form-error-message">{error}</div>}
        </div>
    );
};

export default FormInput;