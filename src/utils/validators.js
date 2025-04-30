/**
 * validators.js
 * Utility functions for validating form inputs and data
 */

/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {boolean} True if the email is valid
 */
export const isValidEmail = (email) => {
    if (!email || typeof email !== 'string') {
        return false;
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validates a password based on common security requirements
 * @param {string} password - The password to validate
 * @param {Object} options - Validation options
 * @param {number} options.minLength - Minimum length (default: 8)
 * @param {boolean} options.requireUppercase - Require uppercase letter (default: true)
 * @param {boolean} options.requireLowercase - Require lowercase letter (default: true)
 * @param {boolean} options.requireNumbers - Require number (default: true)
 * @param {boolean} options.requireSpecialChars - Require special character (default: true)
 * @returns {Object} Validation result with isValid flag and error message
 */
export const validatePassword = (password, options = {}) => {
    const {
        minLength = 8,
        requireUppercase = true,
        requireLowercase = true,
        requireNumbers = true,
        requireSpecialChars = true,
    } = options;

    if (!password || typeof password !== 'string') {
        return { isValid: false, message: 'Password is required' };
    }

    if (password.length < minLength) {
        return {
            isValid: false,
            message: `Password must be at least ${minLength} characters long`
        };
    }

    if (requireUppercase && !/[A-Z]/.test(password)) {
        return {
            isValid: false,
            message: 'Password must contain at least one uppercase letter'
        };
    }

    if (requireLowercase && !/[a-z]/.test(password)) {
        return {
            isValid: false,
            message: 'Password must contain at least one lowercase letter'
        };
    }

    if (requireNumbers && !/\d/.test(password)) {
        return {
            isValid: false,
            message: 'Password must contain at least one number'
        };
    }

    if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return {
            isValid: false,
            message: 'Password must contain at least one special character'
        };
    }

    return { isValid: true, message: '' };
};

/**
 * Validates if a string is not empty
 * @param {string} value - The value to validate
 * @returns {boolean} True if the value is not empty
 */
export const isNotEmpty = (value) => {
    if (typeof value !== 'string') {
        return false;
    }

    return value.trim().length > 0;
};

/**
 * Validates if a value is a number within specified range
 * @param {number|string} value - The value to validate
 * @param {number} min - Minimum allowed value (default: -Infinity)
 * @param {number} max - Maximum allowed value (default: Infinity)
 * @returns {boolean} True if the value is a valid number within range
 */
export const isValidNumber = (value, min = -Infinity, max = Infinity) => {
    const num = parseFloat(value);

    if (isNaN(num)) {
        return false;
    }

    return num >= min && num <= max;
};

/**
 * Validates a URL
 * @param {string} url - The URL to validate
 * @param {boolean} requireProtocol - Whether to require protocol (default: true)
 * @returns {boolean} True if the URL is valid
 */
export const isValidUrl = (url, requireProtocol = true) => {
    if (!url || typeof url !== 'string') {
        return false;
    }

    let pattern = '^';
    if (requireProtocol) {
        pattern += 'https?:\\/\\/';
    }
    pattern += '([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$';

    const urlRegex = new RegExp(pattern, 'i');
    return urlRegex.test(url);
};

/**
 * Validates a phone number
 * @param {string} phoneNumber - The phone number to validate
 * @param {string} countryCode - The country code (default: 'US')
 * @returns {boolean} True if the phone number is valid
 */
export const isValidPhoneNumber = (phoneNumber, countryCode = 'US') => {
    if (!phoneNumber) {
        return false;
    }

    // Remove all non-digit characters
    const digits = phoneNumber.replace(/\D/g, '');

    // Basic validation based on country code
    switch (countryCode.toUpperCase()) {
        case 'US':
            // US phone numbers should have 10 digits
            return digits.length === 10;
        case 'UK':
            // UK phone numbers typically have 10-11 digits
            return digits.length >= 10 && digits.length <= 11;
        default:
            // Generic validation: at least 8 digits
            return digits.length >= 8;
    }
};

// Export all validators
export default {
    isValidEmail,
    validatePassword,
    isNotEmpty,
    isValidNumber,
    isValidUrl,
    isValidPhoneNumber,
};