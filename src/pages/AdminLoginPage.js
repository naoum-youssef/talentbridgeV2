import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/common/Logo';
import '../styles/base.css';
import '../styles/login.css';
import '../styles/forms.css';

const AdminLoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
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
        if (!formData.username || !formData.password) {
            setError('Veuillez remplir tous les champs');
            return;
        }

        // Simulate login API call
        console.log('Admin login:', formData);
        navigate('/admin-dashboard');
    };

    return (
        <div className="login-page admin-login-page">
            <div className="login-container">
                <Link to="/" className="back-link">
                    <i className="fas fa-arrow-left"></i> Retour
                </Link>

                <Logo />
                <h1 className="login-title">Administration</h1>

                <div className="login-form-container">
                    <h2>Connexion Admin</h2>
                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="username">Nom d'utilisateur</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Nom d'utilisateur admin"
                                value={formData.username}
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

                        <div className="form-footer admin-form-footer">
                            <a href="#" className="forgot-password">Mot de passe oublié ?</a>
                            <button type="submit" className="submit-btn">Se Connecter</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="login-image admin-login-image">
                {/* Background image added via CSS */}
            </div>
        </div>
    );
};

export default AdminLoginPage;