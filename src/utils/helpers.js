/**
 * helpers.js
 * General helper functions used throughout the application
 */

/**
 * Debounces a function call
 * @param {Function} func - The function to debounce
 * @param {number} wait - The debounce wait time in milliseconds
 * @returns {Function} The debounced function
 */
export const debounce = (func, wait = 300) => {
    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Creates a throttled function that only invokes the provided function at most once per wait period
 * @param {Function} func - The function to throttle
 * @param {number} wait - The throttle wait time in milliseconds
 * @returns {Function} The throttled function
 */
export const throttle = (func, wait = 300) => {
    let waiting = false;

    return function executedFunction(...args) {
        if (waiting) return;

        waiting = true;
        func(...args);

        setTimeout(() => {
            waiting = false;
        }, wait);
    };
};

/**
 * Deep clones an object
 * @param {Object} obj - The object to clone
 * @returns {Object} The cloned object
 */
export const deepClone = (obj) => {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    try {
        return JSON.parse(JSON.stringify(obj));
    } catch (error) {
        console.error('Failed to deep clone object:', error);
        return Array.isArray(obj) ? [] : {};
    }
};

/**
 * Generates a unique ID
 * @param {string} prefix - Optional prefix for the ID
 * @returns {string} A unique ID
 */
export const generateUniqueId = (prefix = '') => {
    const timestamp = new Date().getTime();
    const randomPart = Math.floor(Math.random() * 10000);
    return `${prefix}${timestamp}-${randomPart}`;
};

/**
 * Gets a nested property from an object using a dot notation path
 * @param {Object} obj - The object to get the property from
 * @param {string} path - The path to the property (e.g., 'user.address.city')
 * @param {*} defaultValue - The default value to return if the property doesn't exist
 * @returns {*} The property value or the default value
 */
export const getNestedProperty = (obj, path, defaultValue = undefined) => {
    if (!obj || !path) {
        return defaultValue;
    }

    const keys = path.split('.');
    let result = obj;

    for (const key of keys) {
        if (result === null || result === undefined || typeof result !== 'object') {
            return defaultValue;
        }

        result = result[key];

        if (result === undefined) {
            return defaultValue;
        }
    }

    return result;
};

/**
 * Sets a nested property on an object using a dot notation path
 * @param {Object} obj - The object to set the property on
 * @param {string} path - The path to the property (e.g., 'user.address.city')
 * @param {*} value - The value to set
 * @returns {Object} The modified object
 */
export const setNestedProperty = (obj, path, value) => {
    if (!obj || !path) {
        return obj;
    }

    const keys = path.split('.');
    const lastKey = keys.pop();
    let current = obj;

    for (const key of keys) {
        if (current[key] === undefined || current[key] === null || typeof current[key] !== 'object') {
            current[key] = {};
        }
        current = current[key];
    }

    current[lastKey] = value;
    return obj;
};

/**
 * Retries a promise-based function multiple times before giving up
 * @param {Function} fn - The async function to retry
 * @param {Object} options - Retry options
 * @param {number} options.maxRetries - Maximum number of retries (default: 3)
 * @param {number} options.delay - Delay between retries in ms (default: 1000)
 * @param {Function} options.onRetry - Callback function on retry (default: null)
 * @returns {Promise} The result of the function
 */
export const retryPromise = async (fn, options = {}) => {
    const {
        maxRetries = 3,
        delay = 1000,
        onRetry = null
    } = options;

    let lastError;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;

            if (attempt < maxRetries) {
                if (typeof onRetry === 'function') {
                    onRetry(error, attempt);
                }

                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }

    throw lastError;
};

/**
 * Groups an array of objects by a specified key
 * @param {Array} array - The array to group
 * @param {string} key - The key to group by
 * @returns {Object} The grouped object
 */
export const groupBy = (array, key) => {
    if (!Array.isArray(array)) {
        return {};
    }

    return array.reduce((result, item) => {
        const groupValue = getNestedProperty(item, key);

        if (groupValue === undefined || groupValue === null) {
            return result;
        }

        const group = String(groupValue);

        if (!result[group]) {
            result[group] = [];
        }

        result[group].push(item);
        return result;
    }, {});
};

/**
 * Checks if a value is empty (null, undefined, empty string, empty array, or empty object)
 * @param {*} value - The value to check
 * @returns {boolean} True if the value is empty
 */
export const isEmpty = (value) => {
    if (value === null || value === undefined) {
        return true;
    }

    if (typeof value === 'string') {
        return value.trim() === '';
    }

    if (Array.isArray(value)) {
        return value.length === 0;
    }

    if (typeof value === 'object') {
        return Object.keys(value).length === 0;
    }

    return false;
};

/**
 * Converts a query string to an object
 * @param {string} queryString - The query string to parse
 * @returns {Object} The parsed query parameters
 */
export const parseQueryString = (queryString) => {
    if (!queryString || typeof queryString !== 'string') {
        return {};
    }

    // Remove the leading '?' if present
    const query = queryString.charAt(0) === '?' ? queryString.substring(1) : queryString;

    if (query === '') {
        return {};
    }

    return query.split('&').reduce((params, param) => {
        const [key, value] = param.split('=');
        params[decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
        return params;
    }, {});
};

/**
 * Converts an object to a query string
 * @param {Object} params - The object to convert
 * @returns {string} The query string
 */
export const toQueryString = (params) => {
    if (!params || typeof params !== 'object') {
        return '';
    }

    return Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
};

/**
 * Removes duplicate items from an array
 * @param {Array} array - The array to process
 * @param {string|Function} [key] - Key or function to identify unique items
 * @returns {Array} Array with duplicates removed
 */
export const removeDuplicates = (array, key) => {
    if (!Array.isArray(array)) {
        return [];
    }

    if (!key) {
        return [...new Set(array)];
    }

    const seen = new Set();

    return array.filter(item => {
        const identifier = typeof key === 'function'
            ? key(item)
            : getNestedProperty(item, key);

        if (seen.has(identifier)) {
            return false;
        }

        seen.add(identifier);
        return true;
    });
};

// Export all helpers
export default {
    debounce,
    throttle,
    deepClone,
    generateUniqueId,
    getNestedProperty,
    setNestedProperty,
    retryPromise,
    groupBy,
    isEmpty,
    parseQueryString,
    toQueryString,
    removeDuplicates,
};