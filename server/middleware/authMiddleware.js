const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Candidat = require('../models/candidat');

const protectCandidat = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.candidat = await Candidat.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Non autorisé, token invalide');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Non autorisé, aucun token');
    }
});

module.exports = { protectCandidat };