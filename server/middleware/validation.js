const { body, param, query, validationResult } = require('express-validator');

// Utility function to handle validation results
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map(err => ({
                field: err.param,
                message: err.msg
            }))
        });
    }
    next();
};

// Authentication validation rules
exports.registerCandidat = [
    body('firstName')
        .trim()
        .notEmpty().withMessage('First name is required')
        .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),
    body('lastName')
        .trim()
        .notEmpty().withMessage('Last name is required')
        .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    validate
];

exports.registerEnterprise = [
    body('companyName')
        .trim()
        .notEmpty().withMessage('Company name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Company name must be between 2 and 100 characters'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    body('industry')
        .trim()
        .notEmpty().withMessage('Industry is required'),
    body('size')
        .trim()
        .notEmpty().withMessage('Company size is required')
        .isIn(['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'])
        .withMessage('Invalid company size'),
    validate
];

// Job validation rules
exports.createJob = [
    body('title')
        .trim()
        .notEmpty().withMessage('Job title is required')
        .isLength({ min: 3, max: 100 }).withMessage('Job title must be between 3 and 100 characters'),
    body('description')
        .trim()
        .notEmpty().withMessage('Job description is required')
        .isLength({ min: 100 }).withMessage('Job description must be at least 100 characters'),
    body('type')
        .trim()
        .notEmpty().withMessage('Job type is required')
        .isIn(['full-time', 'part-time', 'contract', 'internship'])
        .withMessage('Invalid job type'),
    body('location.city')
        .trim()
        .notEmpty().withMessage('City is required'),
    body('location.country')
        .trim()
        .notEmpty().withMessage('Country is required'),
    body('salary.min')
        .optional()
        .isNumeric().withMessage('Minimum salary must be a number')
        .custom((value, { req }) => {
            if (req.body.salary.max && value > req.body.salary.max) {
                throw new Error('Minimum salary cannot be greater than maximum salary');
            }
            return true;
        }),
    body('salary.max')
        .optional()
        .isNumeric().withMessage('Maximum salary must be a number'),
    body('qualifications.required')
        .isArray().withMessage('Required qualifications must be an array'),
    body('qualifications.preferred')
        .optional()
        .isArray().withMessage('Preferred qualifications must be an array'),
    body('applicationDeadline')
        .optional()
        .isISO8601().withMessage('Invalid date format')
        .custom(value => {
            if (new Date(value) < new Date()) {
                throw new Error('Application deadline cannot be in the past');
            }
            return true;
        }),
    validate
];

// Application validation rules
exports.createApplication = [
    body('coverLetter')
        .trim()
        .notEmpty().withMessage('Cover letter is required')
        .isLength({ min: 100, max: 5000 }).withMessage('Cover letter must be between 100 and 5000 characters'),
    body('expectedSalary')
        .optional()
        .isNumeric().withMessage('Expected salary must be a number'),
    body('availableStartDate')
        .optional()
        .isISO8601().withMessage('Invalid date format')
        .custom(value => {
            if (new Date(value) < new Date()) {
                throw new Error('Start date cannot be in the past');
            }
            return true;
        }),
    validate
];

// Profile update validation rules
exports.updateCandidatProfile = [
    body('education.*.institution')
        .optional()
        .trim()
        .notEmpty().withMessage('Institution name is required'),
    body('education.*.degree')
        .optional()
        .trim()
        .notEmpty().withMessage('Degree is required'),
    body('education.*.fieldOfStudy')
        .optional()
        .trim()
        .notEmpty().withMessage('Field of study is required'),
    body('education.*.startDate')
        .optional()
        .isISO8601().withMessage('Invalid date format'),
    body('education.*.endDate')
        .optional()
        .isISO8601().withMessage('Invalid date format')
        .custom((value, { req }) => {
            if (value && req.body.startDate && new Date(value) < new Date(req.body.startDate)) {
                throw new Error('End date cannot be before start date');
            }
            return true;
        }),
    body('experience.*.company')
        .optional()
        .trim()
        .notEmpty().withMessage('Company name is required'),
    body('experience.*.position')
        .optional()
        .trim()
        .notEmpty().withMessage('Position is required'),
    body('experience.*.startDate')
        .optional()
        .isISO8601().withMessage('Invalid date format'),
    body('experience.*.endDate')
        .optional()
        .isISO8601().withMessage('Invalid date format')
        .custom((value, { req }) => {
            if (value && req.body.startDate && new Date(value) < new Date(req.body.startDate)) {
                throw new Error('End date cannot be before start date');
            }
            return true;
        }),
    body('skills')
        .optional()
        .isArray().withMessage('Skills must be an array'),
    validate
];

// Search and filter validation rules
exports.searchJobs = [
    query('page')
        .optional()
        .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    query('search')
        .optional()
        .trim()
        .isLength({ min: 2 }).withMessage('Search term must be at least 2 characters'),
    query('type')
        .optional()
        .isIn(['full-time', 'part-time', 'contract', 'internship'])
        .withMessage('Invalid job type'),
    query('location')
        .optional()
        .trim(),
    query('salary')
        .optional()
        .isInt({ min: 0 }).withMessage('Salary must be a positive number'),
    query('sort')
        .optional()
        .isIn(['recent', 'salary', 'deadline'])
        .withMessage('Invalid sort option'),
    validate
];

// ID parameter validation
exports.validateId = [
    param('id')
        .notEmpty().withMessage('ID is required')
        .isMongoId().withMessage('Invalid ID format'),
    validate
];

// Status update validation
exports.updateStatus = [
    body('status')
        .trim()
        .notEmpty().withMessage('Status is required')
        .isIn(['pending', 'reviewing', 'accepted', 'rejected', 'withdrawn'])
        .withMessage('Invalid status'),
    validate
];