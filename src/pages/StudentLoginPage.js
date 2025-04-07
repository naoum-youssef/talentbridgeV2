
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/common/Logo';
import '../styles/base.css';
import '../styles/login.css';
import '../styles/forms.css';

const StudentLoginPage = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        studentId: '',
        program: '',
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
        console.log('Student login:', { email: formData.email, password: formData.password });
        navigate('/student-dashboard');
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setError('');

        // Basic validation
        const { firstName, lastName, email, password, confirmPassword, studentId, program } = formData;
        if (!firstName || !lastName || !email || !password || !studentId || !program) {
            setError('Veuillez remplir tous les champs obligatoires');
            return;
        }

        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        // Simulate register API call
        console.log('Student registration:', formData);

        // After successful registration, redirect to login
        setIsRegistering(false);
    };

    return (
        <div className="login-page student-login-page">
            <div className="login-container">
                <Link to="/" className="back-link">
                    <i className="fas fa-arrow-left"></i> Retour
                </Link>

                <Logo />
                <h1 className="login-title">Espace Étudiant</h1>

                {!isRegistering ? (
                    // Login Form
                    <div className="login-form-container">
                        <h2>Connexion</h2>
                        {error && <div className="error-message">{error}</div>}

                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <label htmlFor="email">Email Académique</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Votre email académique"
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
                        <h2>Inscription Étudiant</h2>
                        {error && <div className="error-message">{error}</div>}

                        <form onSubmit={handleRegister}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="firstName">Prénom*</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lastName">Nom*</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Académique*</label>
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
                                <label htmlFor="studentId">Numéro d'étudiant*</label>
                                <input
                                    type="text"
                                    id="studentId"
                                    name="studentId"
                                    value={formData.studentId}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="program">Filière d'études*</label>
                                <select
                                    id="program"
                                    name="program"
                                    value={formData.program}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Sélectionnez votre filière</option>
                                    <option value="informatique">Génie Informatique</option>
                                    <option value="reseaux">Réseaux et Télécommunications</option>
                                    <option value="industriel">Génie Industriel</option>
                                    <option value="civil">Génie Civil</option>
                                    <option value="finance">Finance et Comptabilité</option>
                                </select>
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

            <div className="login-image student-login-image">
                {/* Background image added via CSS */}
            </div>
        </div>
    );
};

export default StudentLoginPage;