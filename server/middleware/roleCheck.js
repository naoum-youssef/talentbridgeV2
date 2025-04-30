// server/middleware/roleCheck.js

/**
 * Middleware to check if the authenticated user has one of the allowed roles.
 * Usage: app.use('/admin', roleCheck('admin', 'super_admin'))
 */
function roleCheck(...allowedRoles) {
  return (req, res, next) => {
    // Assumes authentication middleware has set req.user
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        status: 'error',
        message: 'User not authenticated or role missing',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'Access denied: insufficient permissions',
      });
    }

    next();
  };
}

module.exports = roleCheck;