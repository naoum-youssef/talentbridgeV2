// server/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validation = require('../middleware/validation');

// Candidate registration & login
router.post('/register/candidate', validation.candidateRegister, authController.candidateRegister);
router.post('/login/candidate', validation.candidateLogin, authController.candidateLogin);

// Enterprise registration & login
router.post('/register/enterprise', validation.enterpriseRegister, authController.enterpriseRegister);
router.post('/login/enterprise', validation.enterpriseLogin, authController.enterpriseLogin);

// Admin login
router.post('/login/admin', validation.adminLogin, authController.adminLogin);

// Common authentication actions
router.post('/logout', authController.logout);
router.post('/refresh-token', authController.refreshToken);

// Password management
router.post('/forgot-password', validation.forgotPassword, authController.forgotPassword);
router.post('/reset-password', validation.resetPassword, authController.resetPassword);

// (Optional) Email verification
router.post('/verify-email', validation.verifyEmail, authController.verifyEmail);

module.exports = router;