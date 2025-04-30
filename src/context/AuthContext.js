import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create context
const AuthContext = createContext(null);

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Set token to axios default headers
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    // Check user authentication status on load
    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.get('/api/auth/verify');
                setCurrentUser(response.data.user);
                setIsLoading(false);
            } catch (err) {
                console.error('Authentication verification failed:', err);
                localStorage.removeItem('token');
                setToken(null);
                setError(err.response?.data?.message || 'Authentication failed');
                setIsLoading(false);
            }
        };

        verifyToken();
    }, [token]);

    // Login function
    const login = async (email, password) => {
        try {
            setIsLoading(true);
            const response = await axios.post('/api/auth/login', { email, password });

            const { token, user } = response.data;
            localStorage.setItem('token', token);
            setToken(token);
            setCurrentUser(user);
            setError(null);
            return user;
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // Register function
    const register = async (userData) => {
        try {
            setIsLoading(true);
            const response = await axios.post('/api/auth/register', userData);

            const { token, user } = response.data;
            localStorage.setItem('token', token);
            setToken(token);
            setCurrentUser(user);
            setError(null);
            return user;
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setCurrentUser(null);
    };

    // Update user profile function
    const updateProfile = async (userData) => {
        try {
            setIsLoading(true);
            const response = await axios.put('/api/users/profile', userData);
            setCurrentUser(response.data);
            setError(null);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Profile update failed');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // Context value
    const value = {
        currentUser,
        isLoading,
        error,
        login,
        register,
        logout,
        updateProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;