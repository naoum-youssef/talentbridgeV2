import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/common/Logo';
import '../../styles/base.css';
import '../../styles/login.css';
import '../../styles/forms.css';

const EnterpriseLoginPage = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        companyName: '',
        industry: '',
        contactPerson: '',
        phone: '',
        description: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!formData.email || !formData.password) {
            setError('Veuillez remplir tous les champs');
            return;
        }

        // Simulate login API call
        console.log('Enterprise login:', { email: formData.email, password: formData.password });

        // Assuming we have an isApproved flag
        const isApproved = true; // This would come from the API

        if (isApproved) {
            navigate('/enterprise-dashboard');
        } else {
            navigate('/pending-approval');
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setError('');

        // Basic validation
        const { companyName, contactPerson, email, password, confirmPassword, industry } = formData;
        if (!companyName || !contactPerson || !email || !password || !industry) {
            setError('Veuillez remplir tous les champs obligatoires');
            return;
        }

        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        // Simulate register API call
        console.log('Enterprise registration:', formData);

        // After registration, redirect to pending approval
        navigate('/pending-approval');
    };

    return (
        <div className="login-page enterprise-login-page">
            <div className="login-container">
                <Link to="/" className="back-link">
                    <i className="fas fa-arrow-left"></i> Retour
                </Link>

                <Logo />
                <h1 className="login-title">Espace Entreprise</h1>

                {!isRegistering ? (
                    // Login Form
                    <div className="login-form-container">
                        <h2>Connexion</h2>
                        {error && <div className="error-message">{error}</div>}

                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <label htmlFor="email">Email Professionnel</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Votre email professionnel"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Mot de passe</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Votre mot de passe"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-footer">
                                <a href="#" className="forgot-password">Mot de passe oublié ?</a>
                                <button type="submit" className="submit-btn">Se Connecter</button>
                            </div>
                        </form>

                        <div className="register-prompt">
                            <p>Pas encore de compte ?</p>
                            <button
                                className="register-btn"
                                onClick={() => setIsRegistering(true)}
                            >
                                S'inscrire
                            </button>
                        </div>
                    </div>
                ) : (
                    // Registration Form
                    <div className="register-form-container">
                        <h2>Inscription Entreprise</h2>
                        <p className="form-description">
                            Créez votre compte entreprise pour accéder à des talents qualifiés.
                            Votre compte sera activé après vérification par un administrateur.
                        </p>

                        {error && <div className="error-message">{error}</div>}

                        <form onSubmit={handleRegister}>
                            <div className="form-group">
                                <label htmlFor="companyName">Nom de l'entreprise*</label>
                                <input
                                    type="text"
                                    id="companyName"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="industry">Secteur d'activité*</label>
                                <select
                                    id="industry"
                                    name="industry"
                                    value={formData.industry}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Sélectionnez un secteur</option>
                                    <option value="it">Technologies de l'Information</option>
                                    <option value="telecom">Télécommunications</option>
                                    <option value="finance">Finance et Banque</option>
                                    <option value="consulting">Conseil</option>
                                    <option value="manufacturing">Industrie</option>
                                    <option value="other">Autre</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="contactPerson">Personne de contact*</label>
                                <input
                                    type="text"
                                    id="contactPerson"
                                    name="contactPerson"
                                    value={formData.contactPerson}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="email">Email professionnel*</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Téléphone</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description de l'entreprise</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="3"
                                    value={formData.description}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="password">Mot de passe*</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirmer le mot de passe*</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-footer">
                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() => setIsRegistering(false)}
                                >
                                    Annuler
                                </button>
                                <button type="submit" className="submit-btn">
                                    S'inscrire
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>

            <div className="login-image enterprise-login-image">
                {/* Background image added via CSS */}
            </div>
        </div>
    );
};

export default EnterpriseLoginPage;