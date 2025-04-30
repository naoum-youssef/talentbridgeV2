import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    Button,
    CircularProgress
} from '@mui/material';
import {
    People as PeopleIcon,
    Business as BusinessIcon,
    Assignment as AssignmentIcon,
    TrendingUp as TrendingUpIcon
} from '@mui/icons-material';

// Import admin components
import StatsCard from '../../components/admin/StatsCard';
import UserManagementTable from '../../components/admin/UserManagementTable';
import EnterpriseApprovalCard from '../../components/admin/EnterpriseApprovalCard';

const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/admin/dashboard');
                setDashboardData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

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
                <Typography color="error">Error loading dashboard: {error}</Typography>
            </Box>
        );
    }

    // Mock data for development
    const mockData = {
        stats: {
            totalUsers: 1248,
            totalEnterprises: 85,
            pendingApprovals: 12,
            activeJobs: 156,
            userGrowthTrend: { value: 12, direction: 'up' },
            enterpriseGrowthTrend: { value: 8, direction: 'up' }
        },
        users: [
            {
                id: 1,
                name: 'John Doe',
                email: 'john.doe@example.com',
                role: 'candidate',
                status: 'active',
                registrationDate: '2025-03-15'
            },
            {
                id: 2,
                name: 'Jane Smith',
                email: 'jane.smith@company.com',
                role: 'enterprise',
                status: 'active',
                registrationDate: '2025-03-20'
            }
        ],
        pendingEnterprises: [
            {
                id: 101,
                name: 'Tech Solutions Inc',
                domain: 'techsolutions.com',
                contactName: 'Sarah Wilson',
                contactEmail: 'sarah@techsolutions.com',
                submissionDate: '2025-04-20',
                status: 'pending'
            },
            {
                id: 102,
                name: 'Digital Innovations',
                domain: 'digitalinnovations.com',
                contactName: 'Robert Brown',
                contactEmail: 'robert@digitalinnovations.com',
                submissionDate: '2025-04-21',
                status: 'pending'
            }
        ]
    };

    const data = dashboardData || mockData;

    const handleUserEdit = (userId) => {
        console.log('Edit user:', userId);
    };

    const handleUserDelete = (userId) => {
        console.log('Delete user:', userId);
    };

    const handleUserRoleChange = (userId, newRole) => {
        console.log('Change role for user:', userId, 'to:', newRole);
    };

    const handleEnterpriseApproval = (enterpriseId) => {
        console.log('Approve enterprise:', enterpriseId);
    };

    const handleEnterpriseRejection = (enterpriseId) => {
        console.log('Reject enterprise:', enterpriseId);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1">
                    Admin Dashboard
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/admin/content-management"
                >
                    Manage Content
                </Button>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} mb={4}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatsCard
                        title="Total Users"
                        value={data.stats.totalUsers}
                        icon={<PeopleIcon />}
                        trend={data.stats.userGrowthTrend}
                        color="primary"
                        showViewMore
                        onClick={() => console.log('View users details')}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatsCard
                        title="Enterprises"
                        value={data.stats.totalEnterprises}
                        icon={<BusinessIcon />}
                        trend={data.stats.enterpriseGrowthTrend}
                        color="secondary"
                        showViewMore
                        onClick={() => console.log('View enterprises details')}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatsCard
                        title="Pending Approvals"
                        value={data.stats.pendingApprovals}
                        icon={<AssignmentIcon />}
                        color="warning"
                        showViewMore
                        onClick={() => console.log('View pending approvals')}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatsCard
                        title="Active Jobs"
                        value={data.stats.activeJobs}
                        icon={<TrendingUpIcon />}
                        color="success"
                        showViewMore
                        onClick={() => console.log('View active jobs')}
                    />
                </Grid>
            </Grid>

            {/* User Management */}
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    User Management
                </Typography>
                <UserManagementTable
                    users={data.users}
                    onEditUser={handleUserEdit}
                    onDeleteUser={handleUserDelete}
                    onRoleChange={handleUserRoleChange}
                    onViewUserDetails={(userId) => console.log('View user details:', userId)}
                />
            </Paper>

            {/* Enterprise Approvals */}
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Pending Enterprise Approvals
                </Typography>
                <Grid container spacing={3}>
                    {data.pendingEnterprises.map((enterprise) => (
                        <Grid item xs={12} md={6} key={enterprise.id}>
                            <EnterpriseApprovalCard
                                enterprise={enterprise}
                                onApprove={() => handleEnterpriseApproval(enterprise.id)}
                                onReject={() => handleEnterpriseRejection(enterprise.id)}
                                onViewDetails={() => console.log('View enterprise details:', enterprise.id)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Container>
    );
};



export default AdminDashboard;