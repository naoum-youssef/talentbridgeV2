import React, { useState, useRef, useEffect } from 'react';
import '../../styles/base.css';

const Dropdown = ({
                      label,
                      options = [],
                      selectedOption,
                      onSelect,
                      placeholder = 'Select an option',
                      disabled = false
                  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleToggle = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleSelect = (option) => {
        onSelect(option);
        setIsOpen(false);
    };

    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const dropdownClass = `dropdown ${isOpen ? 'dropdown-open' : ''} ${disabled ? 'dropdown-disabled' : ''}`;

    return (
        <div className="form-group" ref={dropdownRef}>
            {label && <label className="form-label">{label}</label>}
            <div className={dropdownClass}>
                <button
                    type="button"
                    className="dropdown-toggle"
                    onClick={handleToggle}
                    disabled={disabled}
                >
                    {selectedOption ? selectedOption.label : placeholder}
                </button>
                {isOpen && (
                    <ul className="dropdown-menu">
                        {options.map((option) => (
                            <li
                                key={option.value}
                                className={`dropdown-item ${selectedOption && selectedOption.value === option.value ? 'dropdown-item-selected' : ''}`}
                                onClick={() => handleSelect(option)}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Dropdown;