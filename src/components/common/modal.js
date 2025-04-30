import React, { useEffect, useRef } from 'react';
import '../../styles/base.css';

const Modal = ({
                   isOpen,
                   onClose,
                   title,
                   children,
                   size = 'medium',
                   showCloseButton = true
               }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        const handleOutsideClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.addEventListener('mousedown', handleOutsideClick);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('mousedown', handleOutsideClick);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const modalClass = `modal-content modal-${size}`;

    return (
        <div className="modal-overlay">
            <div className={modalClass} ref={modalRef}>
                <div className="modal-header">
                    {title && <h2 className="modal-title">{title}</h2>}
                    {showCloseButton && (
                        <button
                            className="modal-close"
                            onClick={onClose}
                            aria-label="Close"
                        >
                            &times;
                        </button>
                    )}
                </div>
                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
};

export default Modal;