// services/adminService.js
import api from './api';

const adminService = {
    // Get dashboard statistics
    getDashboardStats: async () => {
        try {
            const response = await api.get('/admin/dashboard-stats');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get all users with pagination
    getUsers: async (page = 1, limit = 10, filters = {}) => {
        try {
            const response = await api.get('/admin/users', {
                params: { page, limit, ...filters },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get user by ID
    getUserById: async (userId) => {
        try {
            const response = await api.get(`/admin/users/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update user (admin action)
    updateUser: async (userId, userData) => {
        try {
            const response = await api.put(`/admin/users/${userId}`, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Change user status (activate/deactivate)
    changeUserStatus: async (userId, status) => {
        try {
            const response = await api.patch(`/admin/users/${userId}/status`, { status });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete user
    deleteUser: async (userId) => {
        try {
            const response = await api.delete(`/admin/users/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get all job listings (admin view)
    getJobs: async (page = 1, limit = 10, filters = {}) => {
        try {
            const response = await api.get('/admin/jobs', {
                params: { page, limit, ...filters },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Approve/reject job listing
    approveJob: async (jobId, approved, feedback = '') => {
        try {
            const response = await api.patch(`/admin/jobs/${jobId}/approval`, {
                approved,
                feedback,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get system logs
    getLogs: async (page = 1, limit = 20, filters = {}) => {
        try {
            const response = await api.get('/admin/logs', {
                params: { page, limit, ...filters },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get system settings
    getSettings: async () => {
        try {
            const response = await api.get('/admin/settings');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update system settings
    updateSettings: async (settings) => {
        try {
            const response = await api.put('/admin/settings', settings);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default adminService;