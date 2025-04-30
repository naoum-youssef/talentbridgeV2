const express = require('express');
const router = express.Router();
const {
    authCandidat,
    registerCandidat,
    getCandidatProfile,
    updateCandidatProfile,
} = require('../controllers/candidatController');
const { protectCandidat } = require('../middleware/authMiddleware');

router.post('/login', authCandidat);
router.post('/', registerCandidat);
router.route('/profile')
    .get(protectCandidat, getCandidatProfile)
    .put(protectCandidat, updateCandidatProfile);

module.exports = router;