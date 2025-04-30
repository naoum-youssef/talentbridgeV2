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
    Add as AddIcon,
    Work as WorkIcon,
    Person as PersonIcon,
    Assessment as AssessmentIcon
} from '@mui/icons-material';

// Import enterprise components
import ApplicationsTable from '../../components/entreprise/ApplicationsTable';
import CandidateCard from '../../components/entreprise/CandidateCard';

const EnterpriseDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('all');

    // Get enterprise ID from auth context (this would be replaced with your actual auth implementation)
    const enterpriseId = localStorage.getItem('enterpriseId') || '60a1b2c3d4e5f6a7b8c9d0e1';

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/enterprise/${enterpriseId}/dashboard`);
                setDashboardData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [enterpriseId]);

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
        companyName: 'TechInnovate Solutions',
        activeJobs: 12,
        totalApplicants: 248,
        newApplications: 37,
        recentApplications: [
            {
                id: 101,
                candidate: {
                    firstName: 'Jane',
                    lastName: 'Smith',
                    email: 'jane.smith@email.com',
                    phone: '+1234567890',
                    skills: ['React', 'TypeScript', 'Node.js']
                },
                jobTitle: 'Senior Frontend Developer',
                applicationStatus: 'new',
                applicationDate: '2025-04-10',
                resumeUrl: '/resumes/jane-smith.pdf'
            },
            {
                id: 102,
                candidate: {
                    firstName: 'Michael',
                    lastName: 'Johnson',
                    email: 'michael.j@email.com',
                    phone: '+1234567891',
                    skills: ['Product Management', 'Agile', 'Scrum']
                },
                jobTitle: 'Product Manager',
                applicationStatus: 'reviewing',
                applicationDate: '2025-04-09',
                resumeUrl: '/resumes/michael-johnson.pdf'
            },
            {
                id: 103,
                candidate: {
                    firstName: 'Sarah',
                    lastName: 'Williams',
                    email: 'sarah.w@email.com',
                    phone: '+1234567892',
                    skills: ['UI/UX', 'Figma', 'Adobe XD']
                },
                jobTitle: 'UX/UI Designer',
                applicationStatus: 'interview',
                applicationDate: '2025-04-08',
                resumeUrl: '/resumes/sarah-williams.pdf'
            }
        ]
    };

    const data = dashboardData || mockData;

    const handleScheduleInterview = (applicationId) => {
        // TODO: Implement interview scheduling logic
        console.log('Schedule interview for application:', applicationId);
    };

    const handleChangeStatus = (applicationId, newStatus) => {
        // TODO: Implement status change logic
        console.log('Change status for application:', applicationId, 'to:', newStatus);
    };

    const handleDownloadResume = (resumeUrl) => {
        // TODO: Implement resume download logic
        console.log('Download resume:', resumeUrl);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1">
                    Welcome back, {data.companyName}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    component={Link}
                    to="/enterprise/post-job"
                >
                    Post New Job
                </Button>
            </Box>

            {/* Summary Cards */}
            <Grid container spacing={3} mb={4}>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
                        <Box display="flex" alignItems="center" mb={1}>
                            <WorkIcon color="primary" sx={{ mr: 1 }} />
                            <Typography variant="h6">Active Job Postings</Typography>
                        </Box>
                        <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mt: 2 }}>
                            {data.activeJobs}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
                        <Box display="flex" alignItems="center" mb={1}>
                            <PersonIcon color="secondary" sx={{ mr: 1 }} />
                            <Typography variant="h6">Total Applicants</Typography>
                        </Box>
                        <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mt: 2 }}>
                            {data.totalApplicants}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
                        <Box display="flex" alignItems="center" mb={1}>
                            <AssessmentIcon color="info" sx={{ mr: 1 }} />
                            <Typography variant="h6">New Applications</Typography>
                        </Box>
                        <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mt: 2 }}>
                            {data.newApplications}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Applications Overview */}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6">Recent Applications</Typography>
                            <Button component={Link} to="/enterprise/applications" size="small">
                                View All Applications
                            </Button>
                        </Box>
                        <ApplicationsTable
                            applications={data.recentApplications.map(app => ({
                                id: app.id,
                                candidateName: `${app.candidate.firstName} ${app.candidate.lastName}`,
                                position: app.jobTitle,
                                appliedDate: app.applicationDate,
                                status: app.applicationStatus,
                                email: app.candidate.email,
                                phone: app.candidate.phone
                            }))}
                            onViewApplication={(id) => console.log('View application:', id)}
                            onChangeStatus={handleChangeStatus}
                        />
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6">Candidate Details</Typography>
                        </Box>
                        <Grid container spacing={2}>
                            {data.recentApplications.map((application) => (
                                <Grid item xs={12} md={6} lg={4} key={application.id}>
                                    <CandidateCard
                                        candidate={application.candidate}
                                        jobTitle={application.jobTitle}
                                        applicationStatus={application.applicationStatus}
                                        applicationDate={application.applicationDate}
                                        onScheduleInterview={() => handleScheduleInterview(application.id)}
                                        onChangeStatus={(status) => handleChangeStatus(application.id, status)}
                                        onDownloadResume={() => handleDownloadResume(application.resumeUrl)}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default EnterpriseDashboard;