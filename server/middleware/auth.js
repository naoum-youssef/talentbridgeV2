const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Enterprise = require('../models/Enterprise');
const Candidat = require('../models/Candidat');

// Get token from request headers
const getTokenFromHeader = (req) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.split(' ')[1];
    }
    return null;
};

// Verify JWT token
const verifyToken = (token, secret) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
};

// Main authentication middleware
exports.protect = async (req, res, next) => {
    try {
        const token = getTokenFromHeader(req);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this route'
            });
        }

        // Try to verify token with different secrets based on user type
        const decoded = verifyToken(token, process.env.JWT_SECRET);
        
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }

        let user;
        switch (decoded.userType) {
            case 'admin':
                user = await Admin.findById(decoded.id);
                break;
            case 'enterprise':
                user = await Enterprise.findById(decoded.id);
                break;
            case 'candidat':
                user = await Candidat.findById(decoded.id);
                break;
            default:
                return res.status(401).json({
                    success: false,
                    message: 'Invalid user type'
                });
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User no longer exists'
            });
        }

        if (!user.active) {
            return res.status(401).json({
                success: false,
                message: 'User account is deactivated'
            });
        }

        // Add user and userType to request object
        req.user = user;
        req.userType = decoded.userType;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Not authorized to access this route',
            error: error.message
        });
    }
};

// Role authorization middleware
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.userType)) {
            return res.status(403).json({
                success: false,
                message: `User role ${req.userType} is not authorized to access this route`
            });
        }
        next();
    };
};

// Enterprise verification check middleware
exports.verifiedEnterprise = async (req, res, next) => {
    if (req.userType !== 'enterprise') {
        return next();
    }

    if (!req.user.isVerified) {
        return res.status(403).json({
            success: false,
            message: 'Enterprise must be verified to perform this action'
        });
    }
    next();
};

// Active status check middleware
exports.activeStatus = async (req, res, next) => {
    if (!req.user.active) {
        return res.status(403).json({
            success: false,
            message: 'Account is currently deactivated'
        });
    }
    next();
};

// Fresh token check middleware (for sensitive operations)
exports.requireFreshToken = async (req, res, next) => {
    try {
        const token = getTokenFromHeader(req);
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Fresh authentication required'
            });
        }

        const decoded = verifyToken(token, process.env.JWT_SECRET);
        
        if (!decoded || Date.now() >= decoded.exp * 1000) {
            return res.status(401).json({
                success: false,
                message: 'Token expired, please log in again'
            });
        }

        // Check if token was issued within the last 15 minutes
        const tokenAge = Date.now() - (decoded.iat * 1000);
        if (tokenAge > 15 * 60 * 1000) {
            return res.status(401).json({
                success: false,
                message: 'Please authenticate again to perform this action'
            });
        }

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Fresh authentication required',
            error: error.message
        });
    }
};

// Rate limiting middleware for sensitive operations
exports.rateLimitAuth = async (req, res, next) => {
    try {
        const key = `${req.ip}:auth`;
        const attempts = await req.redis.incr(key);
        
        if (attempts === 1) {
            await req.redis.expire(key, 60 * 60); // 1 hour window
        }

        if (attempts > 10) {
            return res.status(429).json({
                success: false,
                message: 'Too many authentication attempts. Please try again later.'
            });
        }

        next();
    } catch (error) {
        // If Redis fails, allow the request but log the error
        console.error('Rate limiting error:', error);
        next();
    }
};