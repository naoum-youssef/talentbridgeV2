// server/routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const userController = require('../controllers/candidatController');
const jobController = require('../controllers/jobController');
const notificationController = require('../controllers/notificationController');
const validation = require('../middleware/validation');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// All routes require authentication and admin/super_admin role
router.use(auth, roleCheck('admin', 'super_admin'));

// Admin profile management
router.get('/profile', adminController.getProfile);
router.put('/profile', validation.adminProfileUpdate, adminController.updateProfile);

// User management
router.get('/users/candidates', userController.getAllCandidates);
router.get('/users/enterprises', userController.getAllEnterprises);
router.get('/users/:userId', userController.getUserById);
router.put('/users/:userId/status', validation.userStatusUpdate, userController.updateUserStatus);
router.delete('/users/:userId', userController.deleteUser);

// Job management
router.get('/jobs', jobController.getAllJobs);
router.get('/jobs/:jobId', jobController.getJobById);
router.put('/jobs/:jobId/status', validation.jobStatusUpdate, jobController.updateJobStatus);
router.delete('/jobs/:jobId', jobController.deleteJob);

// System statistics and analytics
router.get('/stats/overview', adminController.getSystemStats);
router.get('/stats/activity', adminController.getActivityLogs);

// Notifications
router.get('/notifications', notificationController.getAdminNotifications);
router.put('/notifications/:notificationId/read', notificationController.markNotificationAsRead);

module.exports = router;