const jwt = require('jsonwebtoken');

/**
 * Génère un token JWT pour l'authentification
 * @param {string} id - ID de l'utilisateur
 * @returns {string} Token JWT signé
 */
const generateToken = (id) => {
    // Définir une valeur par défaut pour JWT_SECRET si la variable d'environnement n'est pas définie
    const jwtSecret = process.env.JWT_SECRET || "ed841168af8eb6b7e53abbb568aee463dd25569b8663bce733d6c04c1e6ddeff";

    // Log pour débogage (optionnel)
    console.log("JWT Secret disponible:", jwtSecret ? "Oui" : "Non");

    return jwt.sign({ id }, jwtSecret, {
        expiresIn: '30d', // Le token expire après 30 jours
    });
};

module.exports = generateToken;