const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const Candidat = require('../models/candidat');

// @desc    Auth candidat & get token
// @route   POST /api/candidats/login
// @access  Public
const authCandidat = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(`Tentative de connexion avec email: ${email}`);

    const candidat = await Candidat.findOne({ email });
    console.log(`Candidat trouvé: ${candidat ? 'Oui' : 'Non'}`);

    if (candidat) {
        try {
            const isMatch = await candidat.matchPassword(password);
            console.log(`Mot de passe correct: ${isMatch ? 'Oui' : 'Non'}`);

            if (isMatch) {
                res.json({
                    _id: candidat._id,
                    name: candidat.name,
                    email: candidat.email,
                    userType: candidat.userType,
                    studentId: candidat.studentId,
                    program: candidat.program,
                    token: generateToken(candidat._id),
                });
            } else {
                res.status(401);
                throw new Error('Email ou mot de passe invalide - Mot de passe incorrect');
            }
        } catch (error) {
            console.error('Erreur lors de la vérification du mot de passe:', error);
            res.status(500);
            throw new Error('Erreur serveur lors de la vérification du mot de passe');
        }
    } else {
        res.status(401);
        throw new Error('Email ou mot de passe invalide - Utilisateur non trouvé');
    }
});

// @desc    Register a new candidat
// @route   POST /api/candidats
// @access  Public
const registerCandidat = asyncHandler(async (req, res) => {
    const { name, email, password, studentId, program } = req.body;

    const candidatExists = await Candidat.findOne({ email });

    if (candidatExists) {
        res.status(400);
        throw new Error('Candidat déjà existant avec cet email');
    }

    const candidat = await Candidat.create({
        name,
        email,
        password,
        studentId,
        program
    });

    if (candidat) {
        res.status(201).json({
            _id: candidat._id,
            name: candidat.name,
            email: candidat.email,
            userType: candidat.userType,
            studentId: candidat.studentId,
            program: candidat.program,
            token: generateToken(candidat._id),
        });
    } else {
        res.status(400);
        throw new Error('Données candidat invalides');
    }
});

// @desc    Get candidat profile
// @route   GET /api/candidats/profile
// @access  Private
const getCandidatProfile = asyncHandler(async (req, res) => {
    const candidat = await Candidat.findById(req.candidat._id);

    if (candidat) {
        res.json({
            _id: candidat._id,
            name: candidat.name,
            email: candidat.email,
            userType: candidat.userType,
            studentId: candidat.studentId,
            program: candidat.program,
        });
    } else {
        res.status(404);
        throw new Error('Candidat non trouvé');
    }
});

// @desc    Update candidat profile
// @route   PUT /api/candidats/profile
// @access  Private
const updateCandidatProfile = asyncHandler(async (req, res) => {
    const candidat = await Candidat.findById(req.candidat._id);

    if (candidat) {
        candidat.name = req.body.name || candidat.name;
        candidat.email = req.body.email || candidat.email;
        candidat.studentId = req.body.studentId || candidat.studentId;
        candidat.program = req.body.program || candidat.program;

        if (req.body.password) {
            candidat.password = req.body.password;
        }

        const updatedCandidat = await candidat.save();

        res.json({
            _id: updatedCandidat._id,
            name: updatedCandidat.name,
            email: updatedCandidat.email,
            userType: updatedCandidat.userType,
            studentId: updatedCandidat.studentId,
            program: updatedCandidat.program,
            token: generateToken(updatedCandidat._id),
        });
    } else {
        res.status(404);
        throw new Error('Candidat non trouvé');
    }
});

module.exports = {
    authCandidat,
    registerCandidat,
    getCandidatProfile,
    updateCandidatProfile,
};