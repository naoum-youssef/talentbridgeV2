// server/routes/enterpriseRoutes.js

const express = require('express');
const router = express.Router();
const enterpriseController = require('../controllers/enterpriseController');
const jobController = require('../controllers/jobController');
const applicationController = require('../controllers/applicationController');
const notificationController = require('../controllers/notificationController');
const validation = require('../middleware/validation');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// All routes require authentication and enterprise role
router.use(auth, roleCheck('enterprise'));

// Enterprise profile
router.get('/profile', enterpriseController.getProfile);
router.put('/profile', validation.enterpriseProfileUpdate, enterpriseController.updateProfile);

// Job management
router.post('/jobs', validation.jobPost, jobController.createJob);
router.get('/jobs', jobController.getJobs); // List all jobs posted by this enterprise
router.get('/jobs/:jobId', jobController.getJobById);
router.put('/jobs/:jobId', validation.jobUpdate, jobController.updateJob);
router.delete('/jobs/:jobId', jobController.deleteJob);

// Team management
router.get('/team', enterpriseController.getTeam);
router.post('/team', validation.teamMemberAdd, enterpriseController.addTeamMember);
router.delete('/team/:memberId', enterpriseController.removeTeamMember);

// Application management
router.get('/applications', applicationController.getApplicationsForEnterprise);
router.get('/applications/:applicationId', applicationController.getApplicationById);
router.put('/applications/:applicationId/status', validation.applicationStatusUpdate, applicationController.updateApplicationStatus);

// Notifications
router.get('/notifications', notificationController.getEnterpriseNotifications);
router.put('/notifications/:notificationId/read', notificationController.markNotificationAsRead);

module.exports = router;