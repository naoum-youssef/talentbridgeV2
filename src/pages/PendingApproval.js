// src/pages/PendingApproval.js
import React from 'react';
import { Link } from 'react-router-dom';

// Import CSS files
import '../styles/base.css';
import '../styles/login.css';

const PendingApproval = () => {
    return (
        <div className="pending-approval-page">
            <div className="pending-content">
                <div className="pending-icon">
                    <i className="fas fa-clock"></i>
                </div>

                <h1>Votre demande d'inscription est en cours de traitement</h1>

                <p>
                    Merci d'avoir créé votre compte entreprise sur TalentBridge.
                    Votre demande d'inscription a été reçue et est en cours d'examen par notre équipe d'administration.
                </p>

                <p>
                    Ce processus peut prendre jusqu'à 48 heures ouvrables.
                    Vous recevrez un email de confirmation à l'adresse que vous avez fournie
                    dès que votre compte aura été approuvé.
                </p>

                <div className="contact-info">
                    <p>
                        Pour toute question, n'hésitez pas à contacter notre équipe support :
                        <br />
                        <a href="mailto:support@talentbridge.com">support@talentbridge.com</a>
                    </p>
                </div>

                <Link to="/login/enterprise" className="back-to-login">
                    Retour à la page de connexion
                </Link>
            </div>
        </div>
    );
};

export default PendingApproval;