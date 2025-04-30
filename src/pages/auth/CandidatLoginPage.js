import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/common/Logo';
import { useCandidat } from '../../context/CandidatContext';
import '../../styles/base.css';
import '../../styles/login.css';
import '../../styles/forms.css';

/**
 * Component principal dial page login/inscription dial candidats (étudiants)
 * Fiha 2 interfaces: wahda dial login o wahda dial inscription
 */
const CandidatLoginPage = () => {
    // Utiliser le hook candidat pour l'authentification
    const { loginCandidat, registerCandidat, error: candidatError, loading } = useCandidat();

    // State li kaygoul wach l'utilisateur f mode inscription wla connexion
    const [isRegistering, setIsRegistering] = useState(false);

    // State li kaystocki les données dial formulaire
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        studentId: '',
        program: '',
        confirmPassword: ''
    });

    // State dial message d'erreur
    const [localError, setLocalError] = useState('');

    // Hook dial navigation li kaykhelli ndiro redirection pour une autre page
    const navigate = useNavigate();

    // Mettre à jour l'erreur locale quand l'erreur d'authentification change
    useEffect(() => {
        if (candidatError) {
            setLocalError(candidatError);
        }
    }, [candidatError]);

    /**
     * Fonction li kat'mise à jour les données dial formulaire
     * mn3a kanktebo chi haja f chi champ
     */
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    /**
     * Fonction li kat'gérer l'action dial login
     * Kat'verifi les champs obligatoires o kat'connecti l'utilisateur via API
     */
    const handleLogin = async (e) => {
        e.preventDefault();
        setLocalError('');

        // Verification de base dial les champs obligatoires
        if (!formData.email || !formData.password) {
            setLocalError('Veuillez remplir tous les champs');
            return;
        }

        try {
            // Appel à l'API d'authentification
            await loginCandidat(formData.email, formData.password);
            // Si la connexion réussit, rediriger vers le dashboard
            navigate('/candidat-dashboard');
        } catch (error) {
            console.error('Erreur de connexion:', error);
            // L'erreur est déjà gérée par le contexte de candidat
        }
    };

    /**
     * Fonction dial accès direct l dashboard sans authentification
     * (Juste pour développement o testing)
     */
    const directAccessDashboard = () => {
        // Optionnel: Remplir les champs automatiquement
        setFormData({
            ...formData,
            email: "youssefnaoum@gmail.com",
            password: "123456"
        });

        // Navigation directe l dashboard
        navigate('/candidat-dashboard');
    };

    /**
     * Fonction li kat'gérer l'action dial inscription
     * Kat'verifi les champs obligatoires o kat'créer l'utilisateur via API
     */
    const handleRegister = async (e) => {
        e.preventDefault();
        setLocalError('');

        // Récupération des valeurs pour faciliter la validation
        const { firstName, lastName, email, password, confirmPassword, studentId, program } = formData;

        // Verification que tous les champs obligatoires sont remplis
        if (!firstName || !lastName || !email || !password || !studentId || !program) {
            setLocalError('Veuillez remplir tous les champs obligatoires');
            return;
        }

        // Verification que les deux mots de passe sont identiques
        if (password !== confirmPassword) {
            setLocalError('Les mots de passe ne correspondent pas');
            return;
        }

        try {
            // Créer le nom complet pour le champ 'name' de notre modèle Candidat
            const fullName = `${firstName} ${lastName}`;

            // Appel à l'API d'inscription
            await registerCandidat({
                name: fullName,
                email,
                password,
                studentId,
                program
            });

            // Si l'inscription réussit, rediriger vers le dashboard
            navigate('/candidat-dashboard');
        } catch (error) {
            console.error('Erreur d\'inscription:', error);
            // L'erreur est déjà gérée par le contexte de candidat
        }
    };

    return (
        <div className="login-page student-login-page">
            <div className="login-container">
                {/* Bouton de retour vers la page d'accueil */}
                <Link to="/" className="back-link">
                    <i className="fas fa-arrow-left"></i> Retour
                </Link>

                {/* Logo du site */}
                <Logo />

                {/* Titre de la page */}
                <h1 className="login-title">Espace Candidat</h1>

                {/* Affichage conditionnel selon le mode (connexion ou inscription) */}
                {!isRegistering ? (
                    // Formulaire de connexion
                    <div className="login-form-container">
                        <h2>Connexion</h2>
                        {/* Affichage du message d'erreur s'il existe */}
                        {localError && <div className="error-message">{localError}</div>}

                        <form onSubmit={handleLogin}>
                            {/* Champ email */}
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

                            {/* Champ mot de passe */}
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

                            {/* Pied de formulaire avec lien mot de passe oublié et bouton connexion */}
                            <div className="form-footer">
                                <a href="#" className="forgot-password">Mot de passe oublié ?</a>
                                <button
                                    type="submit"
                                    className="submit-btn"
                                    disabled={loading}
                                >
                                    {loading ? 'Connexion...' : 'Se Connecter'}
                                </button>
                            </div>
                        </form>

                        {/* Bouton d'accès direct (pour développement) */}
                        <div className="direct-access">
                            <button
                                onClick={directAccessDashboard}
                                className="direct-access-btn"
                                style={{
                                    backgroundColor: '#3498db',
                                    color: 'white',
                                    padding: '8px 15px',
                                    marginTop: '15px',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                                disabled={loading}
                            >
                                Accès Direct Dashboard (Dev)
                            </button>
                        </div>

                        {/* Section pour s'inscrire si pas encore de compte */}
                        <div className="register-prompt">
                            <p>Pas encore de compte ?</p>
                            <button
                                className="register-btn"
                                onClick={() => setIsRegistering(true)}
                                disabled={loading}
                            >
                                S'inscrire
                            </button>
                        </div>
                    </div>
                ) : (
                    // Formulaire d'inscription
                    <div className="register-form-container">
                        <h2>Inscription Étudiant</h2>
                        {/* Affichage du message d'erreur s'il existe */}
                        {localError && <div className="error-message">{localError}</div>}

                        <form onSubmit={handleRegister}>
                            {/* Ligne avec prénom et nom */}
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

                            {/* Champ email académique */}
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

                            {/* Champ numéro d'étudiant */}
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

                            {/* Menu déroulant pour choisir la filière */}
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

                            {/* Ligne avec mot de passe et confirmation */}
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

                            {/* Pied de formulaire avec boutons annuler et s'inscrire */}
                            <div className="form-footer">
                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() => setIsRegistering(false)}
                                    disabled={loading}
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="submit-btn"
                                    disabled={loading}
                                >
                                    {loading ? 'Inscription...' : 'S\'inscrire'}
                                </button>
                            </div>
                        </form>

                        {/* Bouton d'accès direct même en mode inscription */}
                        <div className="direct-access" style={{ marginTop: '15px', textAlign: 'center' }}>
                            <button
                                onClick={directAccessDashboard}
                                style={{
                                    backgroundColor: '#3498db',
                                    color: 'white',
                                    padding: '8px 15px',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                                disabled={loading}
                            >
                                Accès Direct Dashboard (Dev)
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="login-image student-login-image">
                {/* Image d'arrière-plan ajoutée via CSS */}
            </div>
        </div>
    );
};

export default CandidatLoginPage;