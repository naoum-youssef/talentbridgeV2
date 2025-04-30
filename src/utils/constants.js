/**
 * constants.js
 * Application-wide constants and configuration values
 */

// API endpoints
export const API = {
    BASE_URL: process.env.REACT_APP_API_URL || 'https://api.example.com',
    ENDPOINTS: {
        AUTH: {
            LOGIN: '/auth/login',
            REGISTER: '/auth/register',
            LOGOUT: '/auth/logout',
            REFRESH_TOKEN: '/auth/refresh-token',
            FORGOT_PASSWORD: '/auth/forgot-password',
            RESET_PASSWORD: '/auth/reset-password',
        },
        USERS: {
            GET_PROFILE: '/users/profile',
            UPDATE_PROFILE: '/users/profile',
            GET_USERS: '/users',
            GET_USER: (id) => `/users/${id}`,
            UPDATE_USER: (id) => `/users/${id}`,
            DELETE_USER: (id) => `/users/${id}`,
        },
        PRODUCTS: {
            GET_PRODUCTS: '/products',
            GET_PRODUCT: (id) => `/products/${id}`,
            CREATE_PRODUCT: '/products',
            UPDATE_PRODUCT: (id) => `/products/${id}`,
            DELETE_PRODUCT: (id) => `/products/${id}`,
        },
        // Add more endpoints as needed
    },
};

// HTTP status codes
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
};

// Local storage keys
export const STORAGE_KEYS = {
    AUTH_TOKEN: 'auth_token',
    REFRESH_TOKEN: 'refresh_token',
    USER_INFO: 'user_info',
    THEME: 'app_theme',
    LANGUAGE: 'app_language',
    REMEMBER_ME: 'remember_me',
};

// Application routes
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    SETTINGS: '/settings',
    USERS: '/users',
    USER_DETAILS: (id) => `/users/${id}`,
    PRODUCTS: '/products',
    PRODUCT_DETAILS: (id) => `/products/${id}`,
    NOT_FOUND: '/404',
};

// Form validation error messages
export const VALIDATION_MESSAGES = {
    REQUIRED: 'This field is required',
    EMAIL_INVALID: 'Please enter a valid email address',
    PASSWORD_TOO_SHORT: 'Password must be at least 8 characters long',
    PASSWORD_REQUIREMENTS: 'Password must include uppercase, lowercase, number, and special character',
    PASSWORDS_DO_NOT_MATCH: 'Passwords do not match',
    INVALID_PHONE: 'Please enter a valid phone number',
    INVALID_URL: 'Please enter a valid URL',
    INVALID_NUMBER: 'Please enter a valid number',
};

// User roles and permissions
export const USER_ROLES = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    USER: 'user',
    GUEST: 'guest',
};

// Theme settings
export const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system',
};

// Pagination defaults
export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    LIMIT_OPTIONS: [5, 10, 25, 50, 100],
};

// Date formats
export const DATE_FORMATS = {
    SHORT: 'MM/DD/YYYY',
    LONG: 'MMMM DD, YYYY',
    WITH_TIME: 'MM/DD/YYYY HH:mm',
    ISO: 'YYYY-MM-DD',
};

// File size limits
export const FILE_SIZE_LIMITS = {
    PROFILE_PICTURE: 1024 * 1024 * 2, // 2MB
    DOCUMENT: 1024 * 1024 * 10, // 10MB
    ATTACHMENT: 1024 * 1024 * 5, // 5MB
};

// Supported file types
export const SUPPORTED_FILE_TYPES = {
    IMAGES: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    DOCUMENTS: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt'],
    VIDEOS: ['.mp4', '.avi', '.mov', '.wmv'],
};

// Export as default object for convenient imports
export default {
    API,
    HTTP_STATUS,
    STORAGE_KEYS,
    ROUTES,
    VALIDATION_MESSAGES,
    USER_ROLES,
    THEMES,
    PAGINATION,
    DATE_FORMATS,
    FILE_SIZE_LIMITS,
    SUPPORTED_FILE_TYPES,
};