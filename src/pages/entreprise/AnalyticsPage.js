import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Paper, Typography, Box, CircularProgress } from '@mui/material';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

// Custom hook for fetching analytics data
const useAnalyticsData = (enterpriseId) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/enterprise/${enterpriseId}/analytics`);
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        if (enterpriseId) {
            fetchData();
        }
    }, [enterpriseId]);

    return { data, loading, error };
};

const AnalyticsPage = () => {
    // Get enterprise ID from auth context (this would be replaced with your actual auth implementation)
    const enterpriseId = localStorage.getItem('enterpriseId') || '60a1b2c3d4e5f6a7b8c9d0e1';

    const { data, loading, error } = useAnalyticsData(enterpriseId);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <Typography color="error">Error loading analytics: {error}</Typography>
            </Box>
        );
    }

    // Mock data if needed for development
    const mockData = {
        applicantsByJob: [
            { name: 'Software Engineer', value: 120 },
            { name: 'Product Manager', value: 78 },
            { name: 'UX Designer', value: 56 },
            { name: 'Data Scientist', value: 42 },
            { name: 'DevOps Engineer', value: 35 }
        ],
        applicantsOverTime: [
            { name: 'Jan', value: 40 },
            { name: 'Feb', value: 55 },
            { name: 'Mar', value: 65 },
            { name: 'Apr', value: 90 },
            { name: 'May', value: 120 },
            { name: 'Jun', value: 100 }
        ],
        conversionRates: [
            { name: 'Application View', value: 100 },
            { name: 'Started Application', value: 75 },
            { name: 'Completed Application', value: 45 },
            { name: 'Interview', value: 25 },
            { name: 'Offer', value: 10 }
        ],
        sourceEfficiency: [
            { name: 'LinkedIn', value: 45 },
            { name: 'Indeed', value: 30 },
            { name: 'Referral', value: 15 },
            { name: 'Company Website', value: 35 },
            { name: 'Other', value: 10 }
        ]
    };

    const displayData = data || mockData;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Job Posting Analytics
            </Typography>

            <Grid container spacing={3}>
                {/* Applicants by Job */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2, height: 300 }}>
                        <Typography variant="h6" gutterBottom>
                            Applicants by Job Position
                        </Typography>
                        <ResponsiveContainer width="100%" height="85%">
                            <PieChart>
                                <Pie
                                    data={displayData.applicantsByJob}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                    {displayData.applicantsByJob.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                            </PieChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Applicants Over Time */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2, height: 300 }}>
                        <Typography variant="h6" gutterBottom>
                            Applicants Over Time
                        </Typography>
                        <ResponsiveContainer width="100%" height="85%">
                            <LineChart
                                data={displayData.applicantsOverTime}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="value" name="Applications" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Conversion Funnel */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2, height: 300 }}>
                        <Typography variant="h6" gutterBottom>
                            Applicant Conversion Funnel
                        </Typography>
                        <ResponsiveContainer width="100%" height="85%">
                            <BarChart
                                data={displayData.conversionRates}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" name="Applicants" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Source Efficiency */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2, height: 300 }}>
                        <Typography variant="h6" gutterBottom>
                            Application Source Efficiency
                        </Typography>
                        <ResponsiveContainer width="100%" height="85%">
                            <BarChart
                                data={displayData.sourceEfficiency}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" name="Applicants" fill="#00C49F" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AnalyticsPage;