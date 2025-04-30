// services/jobService.js
import api from './api';

const jobService = {
    // Get all job listings with filters
    getJobs: async (filters = {}, page = 1, limit = 10) => {
        try {
            const response = await api.get('/jobs', {
                params: { ...filters, page, limit },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get job by ID
    getJobById: async (jobId) => {
        try {
            const response = await api.get(`/jobs/${jobId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Create new job (for enterprises)
    createJob: async (jobData) => {
        try {
            const response = await api.post('/jobs', jobData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update job (for enterprises)
    updateJob: async (jobId, jobData) => {
        try {
            const response = await api.put(`/jobs/${jobId}`, jobData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete job (for enterprises)
    deleteJob: async (jobId) => {
        try {
            const response = await api.delete(`/jobs/${jobId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Change job status (active/inactive/filled)
    changeJobStatus: async (jobId, status) => {
        try {
            const response = await api.patch(`/jobs/${jobId}/status`, { status });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get similar jobs
    getSimilarJobs: async (jobId, limit = 5) => {
        try {
            const response = await api.get(`/jobs/${jobId}/similar`, {
                params: { limit },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get job categories
    getJobCategories: async () => {
        try {
            const response = await api.get('/jobs/categories');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get featured jobs
    getFeaturedJobs: async (limit = 5) => {
        try {
            const response = await api.get('/jobs/featured', {
                params: { limit },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Search jobs
    searchJobs: async (searchTerm, filters = {}, page = 1, limit = 10) => {
        try {
            const response = await api.get('/jobs/search', {
                params: {
                    q: searchTerm,
                    ...filters,
                    page,
                    limit
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default jobService;