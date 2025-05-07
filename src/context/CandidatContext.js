import React, { createContext, useContext, useState, useEffect } from 'react';
import * as candidatService from '../services/candidatService';

// Créer le contexte mais sans l'exporter directement
const CandidatContext = createContext(null);

// Définir le provider sans l'exporter directement
const CandidatProvider = ({ children }) => {
    const [candidat, setCandidat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Vérifier si le candidat est déjà connecté
        const candidatInfo = localStorage.getItem('candidatInfo');

        if (candidatInfo) {
            setCandidat(JSON.parse(candidatInfo));
        }

        setLoading(false);
    }, []);

    // Connexion
    const loginCandidat = async (email, password) => {
        try {
            setError(null);
            setLoading(true);
            const candidatData = await candidatService.loginCandidat(email, password);
            setCandidat(candidatData);
            setLoading(false);
            return candidatData;
        } catch (error) {
            setLoading(false);
            setError(error.response?.data?.message || 'Une erreur est survenue');
            throw error;
        }
    };

    // Inscription
    const registerCandidat = async (candidatData) => {
        try {
            setError(null);
            setLoading(true);
            const newCandidat = await candidatService.registerCandidat(candidatData);
            setCandidat(newCandidat);
            setLoading(false);
            return newCandidat;
        } catch (error) {
            setLoading(false);
            setError(error.response?.data?.message || 'Une erreur est survenue');
            throw error;
        }
    };

    // Déconnexion
    const logoutCandidat = () => {
        candidatService.logoutCandidat();
        setCandidat(null);
    };

    const value = {
        candidat,
        loading,
        error,
        loginCandidat,
        registerCandidat,
        logoutCandidat,
    };

    return <CandidatContext.Provider value={value}>{children}</CandidatContext.Provider>;
};

// Définir le hook custom sans l'exporter directement
const useCandidat = () => {
    return useContext(CandidatContext);
};

// Exporter tout à la fin
export { CandidatContext, CandidatProvider, useCandidat };