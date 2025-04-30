import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCandidat } from '../../context/CandidatContext';

const ProtectedCandidatRoute = ({ children }) => {
    const { candidat, loading } = useCandidat();

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (!candidat) {
        return <Navigate to="/candidat-login" />;
    }

    return children;
};

export default ProtectedCandidatRoute;