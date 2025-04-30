// services/enterpriseService.js
import api from './api';

const enterpriseService = {
    // Get enterprise profile
    getProfile: async () => {
        try {
            const response = await api.get('/enterprises/profile');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update enterprise profile
    updateProfile: async (profileData) => {
        try {
            const response = await api.put('/enterprises/profile', profileData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Upload company logo
    uploadLogo: async (file) => {
        try {
            const formData = new FormData();
            formData.append('logo', file);

            const response = await api.post('/enterprises/logo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get all enterprises (for directory)
    getAllEnterprises: async (filters = {}) => {
        try {
            const response = await api.get('/enterprises', { params: filters });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get single enterprise by ID
    getEnterpriseById: async (id) => {
        try {
            const response = await api.get(`/enterprises/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get enterprise statistics
    getStatistics: async () => {
        try {
            const response = await api.get('/enterprises/statistics');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get applications for enterprise jobs
    getApplications: async (filters = {}) => {
        try {
            const response = await api.get('/enterprises/applications', { params: filters });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update application status (accept, reject, schedule interview)
    updateApplicationStatus: async (applicationId, status, feedback = '') => {
        try {
            const response = await api.patch(`/enterprises/applications/${applicationId}`, {
                status,
                feedback
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Schedule an interview
    scheduleInterview: async (applicationId, interviewData) => {
        try {
            const response = await api.post(`/enterprises/applications/${applicationId}/interview`, interviewData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default enterpriseService;