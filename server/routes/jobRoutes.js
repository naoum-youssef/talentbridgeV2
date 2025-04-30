// server/routes/jobRoutes.js

const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const validation = require('../middleware/validation');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// Public job search and view
router.get('/search', validation.jobSearch, jobController.searchJobs);
router.get('/:jobId', jobController.getJobById);

// The following routes require authentication and enterprise/admin role
router.use(auth, roleCheck('enterprise', 'admin', 'super_admin'));

// Create, update, delete jobs
router.post('/', validation.jobPost, jobController.createJob);
router.put('/:jobId', validation.jobUpdate, jobController.updateJob);
router.delete('/:jobId', jobController.deleteJob);

// Advanced features (optional, per your memories)
router.get('/:jobId/candidates', jobController.getMatchedCandidates); // Smart matching
router.get('/stats/overview', jobController.getJobStats); // Analytics

module.exports = router;// server/routes/candidatRoutes.js

const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');
const applicationController = require('../controllers/applicationController');
const notificationController = require('../controllers/notificationController');
const validation = require('../middleware/validation');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// All routes require authentication and candidate role
router.use(auth, roleCheck('candidate'));

// Candidate profile management
router.get('/profile', candidateController.getProfile);
router.put('/profile', validation.candidateProfileUpdate, candidateController.updateProfile);

// Resume and document uploads
router.post('/resume', validation.resumeUpload, candidateController.uploadResume);
router.delete('/resume', candidateController.deleteResume);

// Job applications
router.post('/apply/:jobId', validation.applicationSubmit, applicationController.applyToJob);
router.get('/applications', applicationController.getCandidateApplications);
router.get('/applications/:applicationId', applicationController.getApplicationById);
router.delete('/applications/:applicationId', applicationController.withdrawApplication);

// Saved jobs
router.post('/saved/:jobId', candidateController.saveJob);
router.delete('/saved/:jobId', candidateController.unsaveJob);
router.get('/saved', candidateController.getSavedJobs);

// Job recommendations
router.get('/recommendations', candidateController.getJobRecommendations);

// Notifications
router.get('/notifications', notificationController.getCandidateNotifications);
router.put('/notifications/:notificationId/read', notificationController.markNotificationAsRead);

module.exports = router;