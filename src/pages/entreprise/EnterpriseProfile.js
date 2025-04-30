import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    TextField,
    Button,
    Avatar,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Snackbar,
    Alert,
    IconButton,
    CircularProgress
} from '@mui/material';
import {
    Save as SaveIcon,
    Edit as EditIcon,
    Upload as UploadIcon,
    Business as BusinessIcon
} from '@mui/icons-material';

const EnterpriseProfile = () => {
    // Get enterprise ID from auth context (this would be replaced with your actual auth implementation)
    const enterpriseId = localStorage.getItem('enterpriseId') || '60a1b2c3d4e5f6a7b8c9d0e1';

    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({});
    const [editing, setEditing] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/enterprise/${enterpriseId}/profile`);
                setProfileData(response.data);
                setFormData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [enterpriseId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    logo: reader.result
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProfile = async () => {
        try {
            await axios.put(`/api/enterprise/${enterpriseId}/profile`, formData);
            setProfileData(formData);
            setEditing(false);
            setSnackbar({
                open: true,
                message: 'Profile updated successfully!',
                severity: 'success'
            });
        } catch (err) {
            setSnackbar({
                open: true,
                message: `Error updating profile: ${err.message}`,
                severity: 'error'
            });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

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
                <Typography color="error">Error loading profile: {error}</Typography>
            </Box>
        );
    }

    // Mock data for development
    const mockData = {
        companyName: 'TechInnovate Solutions',
        industry: 'Information Technology',
        website: 'https://techinnovatesolutions.com',
        size: '51-200',
        founded: '2015',
        headquarters: 'San Francisco, CA',
        description: 'TechInnovate Solutions is a forward-thinking tech company specializing in cloud solutions, AI integration, and digital transformation services. We partner with businesses of all sizes to drive innovation and achieve technological excellence.',
        mission: 'To empower businesses through innovative technology solutions that drive growth and efficiency',
        logo: 'https://via.placeholder.com/150',
        social: {
            linkedin: 'https://linkedin.com/company/techinnovate',
            twitter: 'https://twitter.com/techinnovate',
            facebook: 'https://facebook.com/techinnovate'
        },
        contact: {
            email: 'hr@techinnovatesolutions.com',
            phone: '+1 (555) 123-4567'
        }
    };

    const data = profileData || mockData;
    const displayData = editing ? formData : data;

    const companySizes = [
        '1-10',
        '11-50',
        '51-200',
        '201-500',
        '501-1000',
        '1001-5000',
        '5001-10000',
        '10000+'
    ];

    const industries = [
        'Information Technology',
        'Financial Services',
        'Healthcare',
        'Education',
        'E-commerce',
        'Manufacturing',
        'Retail',
        'Media & Entertainment',
        'Consulting',
        'Telecommunications',
        'Energy',
        'Transportation',
        'Real Estate',
        'Other'
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h4" component="h1">
                        Company Profile
                    </Typography>
                    <Button
                        variant={editing ? "contained" : "outlined"}
                        color={editing ? "primary" : "secondary"}
                        startIcon={editing ? <SaveIcon /> : <EditIcon />}
                        onClick={editing ? handleSaveProfile : () => setEditing(true)}
                    >
                        {editing ? 'Save Changes' : 'Edit Profile'}
                    </Button>
                </Box>

                <Grid container spacing={4}>
                    {/* Logo and Basic Info */}
                    <Grid item xs={12} md={4}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Avatar
                                src={displayData.logo}
                                alt={displayData.companyName}
                                sx={{ width: 150, height: 150, mb: 2 }}
                            >
                                <BusinessIcon sx={{ fontSize: 80 }} />
                            </Avatar>

                            {editing && (
                                <Button
                                    variant="outlined"
                                    component="label"
                                    startIcon={<UploadIcon />}
                                    size="small"
                                    sx={{ mb: 2 }}
                                >
                                    Upload Logo
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={handleLogoUpload}
                                    />
                                </Button>
                            )}

                            <Box width="100%" mt={2}>
                                <TextField
                                    label="Company Name"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    name="companyName"
                                    value={displayData.companyName}
                                    onChange={handleInputChange}
                                    disabled={!editing}
                                    required
                                />

                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Industry</InputLabel>
                                    <Select
                                        name="industry"
                                        value={displayData.industry}
                                        label="Industry"
                                        onChange={handleInputChange}
                                        disabled={!editing}
                                    >
                                        {industries.map((industry) => (
                                            <MenuItem key={industry} value={industry}>
                                                {industry}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <TextField
                                    label="Website"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    name="website"
                                    value={displayData.website}
                                    onChange={handleInputChange}
                                    disabled={!editing}
                                />

                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Company Size</InputLabel>
                                    <Select
                                        name="size"
                                        value={displayData.size}
                                        label="Company Size"
                                        onChange={handleInputChange}
                                        disabled={!editing}
                                    >
                                        {companySizes.map((size) => (
                                            <MenuItem key={size} value={size}>
                                                {size} employees
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Company Details */}
                    <Grid item xs={12} md={8}>
                        <TextField
                            label="Founded Year"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="founded"
                            value={displayData.founded}
                            onChange={handleInputChange}
                            disabled={!editing}
                        />

                        <TextField
                            label="Headquarters"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="headquarters"
                            value={displayData.headquarters}
                            onChange={handleInputChange}
                            disabled={!editing}
                        />

                        <TextField
                            label="Company Description"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="description"
                            value={displayData.description}
                            onChange={handleInputChange}
                            disabled={!editing}
                            multiline
                            rows={4}
                        />

                        <TextField
                            label="Company Mission"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="mission"
                            value={displayData.mission}
                            onChange={handleInputChange}
                            disabled={!editing}
                            multiline
                            rows={2}
                        />

                        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                            Contact Information
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Contact Email"
                                    variant="outlined"
                                    fullWidth
                                    name="contact.email"
                                    value={displayData.contact?.email}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        contact: { ...formData.contact, email: e.target.value }
                                    })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Contact Phone"
                                    variant="outlined"
                                    fullWidth
                                    name="contact.phone"
                                    value={displayData.contact?.phone}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        contact: { ...formData.contact, phone: e.target.value }
                                    })}
                                    disabled={!editing}
                                />
                            </Grid>
                        </Grid>

                        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                            Social Media
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="LinkedIn"
                                    variant="outlined"
                                    fullWidth
                                    name="social.linkedin"
                                    value={displayData.social?.linkedin}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        social: { ...formData.social, linkedin: e.target.value }
                                    })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Twitter"
                                    variant="outlined"
                                    fullWidth
                                    name="social.twitter"
                                    value={displayData.social?.twitter}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        social: { ...formData.social, twitter: e.target.value }
                                    })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Facebook"
                                    variant="outlined"
                                    fullWidth
                                    name="social.facebook"
                                    value={displayData.social?.facebook}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        social: { ...formData.social, facebook: e.target.value }
                                    })}
                                    disabled={!editing}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default EnterpriseProfile;