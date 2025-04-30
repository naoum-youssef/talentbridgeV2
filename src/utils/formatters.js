/**
 * formatters.js
 * Utility functions for formatting data throughout the application
 */

/**
 * Formats a date to the specified format
 * @param {Date|string|number} date - The date to format
 * @param {string} format - The format to use (default: 'DD/MM/YYYY')
 * @returns {string} The formatted date
 */
export const formatDate = (date, format = 'DD/MM/YYYY') => {
    const dateObj = date instanceof Date ? date : new Date(date);

    if (isNaN(dateObj.getTime())) {
        console.error('Invalid date provided to formatDate');
        return '';
    }

    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();

    let result = format;
    result = result.replace('DD', day);
    result = result.replace('MM', month);
    result = result.replace('YYYY', year.toString());
    result = result.replace('YY', year.toString().slice(-2));

    return result;
};

/**
 * Formats a number as currency
 * @param {number} amount - The amount to format
 * @param {string} currency - The currency code (default: 'USD')
 * @param {string} locale - The locale to use for formatting (default: 'en-US')
 * @returns {string} The formatted currency
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
    if (typeof amount !== 'number') {
        console.error('Invalid amount provided to formatCurrency');
        return '';
    }

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

/**
 * Formats a phone number to a standard format
 * @param {string} phoneNumber - The phone number to format
 * @param {string} format - The format to use (default: 'XXX-XXX-XXXX')
 * @returns {string} The formatted phone number
 */
export const formatPhoneNumber = (phoneNumber, format = 'XXX-XXX-XXXX') => {
    // Remove all non-digit characters
    const digits = phoneNumber.replace(/\D/g, '');

    if (digits.length < 10) {
        console.error('Invalid phone number provided to formatPhoneNumber');
        return phoneNumber;
    }

    // Format based on the provided format
    let result = format;
    for (let i = 0; i < digits.length && result.includes('X'); i++) {
        result = result.replace('X', digits[i]);
    }

    return result;
};

/**
 * Truncates a string to the specified length and adds ellipsis if needed
 * @param {string} text - The text to truncate
 * @param {number} maxLength - The maximum length (default: 100)
 * @returns {string} The truncated text
 */
export const truncateText = (text, maxLength = 100) => {
    if (!text || typeof text !== 'string') {
        return '';
    }

    if (text.length <= maxLength) {
        return text;
    }

    return text.slice(0, maxLength) + '...';
};

/**
 * Formats a file size in bytes to a human-readable format
 * @param {number} bytes - The size in bytes
 * @param {number} decimals - The number of decimal places (default: 2)
 * @returns {string} The formatted file size
 */
export const formatFileSize = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
};

// Export all formatters
export default {
    formatDate,
    formatCurrency,
    formatPhoneNumber,
    truncateText,
    formatFileSize,
};