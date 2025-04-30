import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/common/Logo';
import '../styles/base.css';
import '../styles/selection.css';

const MainSelectionPage = () => {
    const navigate = useNavigate();

    const handleSelection = (userType) => {
        navigate(`/login/${userType}`);
    };

    return (
        <div className="selection-page">
            <div className="selection-container">
                <Logo />
                <h1 className="selection-title">TalentBridge</h1>
                <p className="selection-tagline">Système de Mise en Relation pour Stages et Opportunités Professionnelles</p>

                <div className="selection-options">
                    <div
                        className="selection-card"
                        onClick={() => handleSelection('candidat')}
                    >
                        <div className="selection-icon student-icon">
                            <i className="fas fa-user-graduate"></i>
                        </div>
                        <h2>Candidat</h2>
                        <p>Trouvez des stages et opportunités adaptés à votre profil</p>
                        <button className="selection-btn">Continuer</button>
                    </div>

                    <div
                        className="selection-card"
                        onClick={() => handleSelection('enterprise')}
                    >
                        <div className="selection-icon enterprise-icon">
                            <i className="fas fa-building"></i>
                        </div>
                        <h2>Entreprise</h2>
                        <p>Recrutez des talents qualifiés pour vos stages et emplois</p>
                        <button className="selection-btn">Continuer</button>
                    </div>

                    <div
                        className="selection-card"
                        onClick={() => handleSelection('admin')}
                    >
                        <div className="selection-icon admin-icon">
                            <i className="fas fa-user-shield"></i>
                        </div>
                        <h2>Administrateur</h2>
                        <p>Gérez la plateforme et les utilisateurs</p>
                        <button className="selection-btn">Continuer</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainSelectionPage;