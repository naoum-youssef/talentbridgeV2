import api from './api';

// Login candidat
export const loginCandidat = async (email, password) => {
    const response = await api.post('/candidats/login', { email, password });

    if (response.data) {
        localStorage.setItem('candidatInfo', JSON.stringify(response.data));
        localStorage.setItem('candidatToken', response.data.token);
    }

    return response.data;
};

// Enregistrement candidat
export const registerCandidat = async (candidatData) => {
    const response = await api.post('/candidats', candidatData);

    if (response.data) {
        localStorage.setItem('candidatInfo', JSON.stringify(response.data));
        localStorage.setItem('candidatToken', response.data.token);
    }

    return response.data;
};

// Déconnexion
export const logoutCandidat = () => {
    localStorage.removeItem('candidatInfo');
    localStorage.removeItem('candidatToken');
};

// Récupération du profil
export const getCandidatProfile = async () => {
    const response = await api.get('/candidats/profile');
    return response.data;
};