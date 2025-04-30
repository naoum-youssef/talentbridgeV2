import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Switch,
    Chip,
    IconButton,
    Divider,
    Snackbar,
    Alert,
    CircularProgress
} from '@mui/material';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Save as SaveIcon,
    Check as CheckIcon
} from '@mui/icons-material';

const PostJob = () => {
    const navigate = useNavigate();

    // Get enterprise ID from auth context (this would be replaced with your actual auth implementation)
    const enterpriseId = localStorage.getItem('enterpriseId') || '60a1b2c3d4e5f6a7b8c9d0e1';

    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [jobData, setJobData] = useState({
        title: '',
        location: '',
        locationType: 'onsite', // onsite, remote, hybrid
        employmentType: 'full-time', // full-time, part-time, contract, internship
        experienceLevel: 'mid-level', // entry-level, mid-level, senior, executive
        description: '',
        responsibilities: [''],
        requirements: [''],
        skills: [''],
        minSalary: '',
        maxSalary: '',
        salaryType: 'yearly', // yearly, monthly, hourly
        benefits: [''],
        applicationDeadline: '',
        visaSponsorshipAvailable: false,
        companyOverview: '',
        applicationUrl: '',
        visible: true
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setJobData({
            ...jobData,
            [name]: value
        });
    };

    const handleArrayItemChange = (e, index, field) => {
        const newArray = [...jobData[field]];
        newArray[index] = e.target.value;
        setJobData({
            ...jobData,
            [field]: newArray
        });
    };

    const addArrayItem = (field) => {
        setJobData({
            ...jobData,
            [field]: [...jobData[field], '']
        });
    };

    const removeArrayItem = (index, field) => {
        const newArray = [...jobData[field]];
        newArray.splice(index, 1);
        setJobData({
            ...jobData,
            [field]: newArray
        });
    };

    const handleSwitchChange = (e) => {
        const { name, checked } = e.target;
        setJobData({
            ...jobData,
            [name]: checked
        });
    };

    const validateForm = () => {
        // Check required fields
        const requiredFields = ['title', 'location', 'description', 'applicationDeadline'];
        const missingFields = requiredFields.filter(field => !jobData[field]);

        if (missingFields.length > 0) {
            setSnackbar({
                open: true,
                message: `Please fill out the following required fields: ${missingFields.join(', ')}`,
                severity: 'error'
            });
            return false;
        }

        // Check array fields have at least one non-empty value
        const arrayFields = ['responsibilities', 'requirements', 'skills'];
        const emptyArrayFields = arrayFields.filter(field =>
            jobData[field].length === 0 || jobData[field].every(item => !item)
        );

        if (emptyArrayFields.length > 0) {
            setSnackbar({
                open: true,
                message: `Please add at least one item to: ${emptyArrayFields.join(', ')}`,
                severity: 'error'
            });
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setSubmitting(true);

        try {
            const response = await axios.post(`/api/enterprise/${enterpriseId}/jobs`, jobData);
            setSuccess(true);
            setSnackbar({
                open: true,
                message: 'Job posted successfully!',
                severity: 'success'
            });

            // Redirect to job view after a short delay
            setTimeout(() => {
                navigate(`/enterprise/job/${response.data.jobId}`);
            }, 2000);
        } catch (err) {
            setError(err.message);
            setSnackbar({
                open: true,
                message: `Error posting job: ${err.message}`,
                severity: 'error'
            });
        } finally {
            setSubmitting(false);
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

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Box mb={3}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Post a New Job
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Complete the form below to post a new job opening. Fields marked with * are required.
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {/* Basic Job Details */}
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Basic Job Details
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Job Title *"
                                        name="title"
                                        value={jobData.title}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Location *"
                                        name="location"
                                        value={jobData.location}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                        placeholder="City, State or 'Remote'"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <InputLabel>Location Type</InputLabel>
                                        <Select
                                            name="locationType"
                                            value={jobData.locationType}
                                            label="Location Type"
                                            onChange={handleInputChange}
                                        >
                                            <MenuItem value="onsite">On-site</MenuItem>
                                            <MenuItem value="remote">Remote</MenuItem>
                                            <MenuItem value="hybrid">Hybrid</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <InputLabel>Employment Type</InputLabel>
                                        <Select
                                            name="employmentType"
                                            value={jobData.employmentType}
                                            label="Employment Type"
                                            onChange={handleInputChange}
                                        >
                                            <MenuItem value="full-time">Full-time</MenuItem>
                                            <MenuItem value="part-time">Part-time</MenuItem>
                                            <MenuItem value="contract">Contract</MenuItem>
                                            <MenuItem value="internship">Internship</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <InputLabel>Experience Level</InputLabel>
                                        <Select
                                            name="experienceLevel"
                                            value={jobData.experienceLevel}
                                            label="Experience Level"
                                            onChange={handleInputChange}
                                        >
                                            <MenuItem value="entry-level">Entry Level</MenuItem>
                                            <MenuItem value="mid-level">Mid Level</MenuItem>
                                            <MenuItem value="senior">Senior</MenuItem>
                                            <MenuItem value="executive">Executive</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Job Description */}
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Job Description
                            </Typography>
                            <TextField
                                label="Description *"
                                name="description"
                                value={jobData.description}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                multiline
                                rows={6}
                                placeholder="Provide a comprehensive description of the position..."
                            />
                        </Grid>

                        {/* Responsibilities */}
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                <Typography variant="h6">
                                    Key Responsibilities
                                </Typography>
                                <Button
                                    startIcon={<AddIcon />}
                                    onClick={() => addArrayItem('responsibilities')}
                                    color="primary"
                                    size="small"
                                >
                                    Add Responsibility
                                </Button>
                            </Box>
                            {jobData.responsibilities.map((responsibility, index) => (
                                <Box key={index} display="flex" alignItems="center" mb={1}>
                                    <TextField
                                        label={`Responsibility ${index + 1}`}
                                        value={responsibility}
                                        onChange={(e) => handleArrayItemChange(e, index, 'responsibilities')}
                                        fullWidth
                                        margin="dense"
                                    />
                                    <IconButton
                                        color="error"
                                        onClick={() => removeArrayItem(index, 'responsibilities')}
                                        disabled={jobData.responsibilities.length === 1}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            ))}
                        </Grid>

                        {/* Requirements */}
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                <Typography variant="h6">
                                    Requirements
                                </Typography>
                                <Button
                                    startIcon={<AddIcon />}
                                    onClick={() => addArrayItem('requirements')}
                                    color="primary"
                                    size="small"
                                >
                                    Add Requirement
                                </Button>
                            </Box>
                            {jobData.requirements.map((requirement, index) => (
                                <Box key={index} display="flex" alignItems="center" mb={1}>
                                    <TextField
                                        label={`Requirement ${index + 1}`}
                                        value={requirement}
                                        onChange={(e) => handleArrayItemChange(e, index, 'requirements')}
                                        fullWidth
                                        margin="dense"
                                    />
                                    <IconButton
                                        color="error"
                                        onClick={() => removeArrayItem(index, 'requirements')}
                                        disabled={jobData.requirements.length === 1}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            ))}
                        </Grid>

                        {/* Skills */}
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                <Typography variant="h6">
                                    Required Skills
                                </Typography>
                                <Button
                                    startIcon={<AddIcon />}
                                    onClick={() => addArrayItem('skills')}
                                    color="primary"
                                    size="small"
                                >
                                    Add Skill
                                </Button>
                            </Box>
                            <Box display="flex" flexWrap="wrap" sx={{ mb: 2 }}>
                                {jobData.skills.map((skill, index) => skill && (
                                    <Chip
                                        key={index}
                                        label={skill}
                                        onDelete={() => removeArrayItem(index, 'skills')}
                                        color="primary"
                                        variant="outlined"
                                        sx={{ m: 0.5 }}
                                    />
                                ))}
                            </Box>
                            <Box display="flex" alignItems="center">
                                <TextField
                                    label="Add a Skill"
                                    value={jobData.skills[jobData.skills.length - 1] || ''}
                                    onChange={(e) => handleArrayItemChange(e, jobData.skills.length - 1, 'skills')}
                                    fullWidth
                                    margin="dense"
                                    placeholder="e.g., JavaScript, Project Management, Communication"
                                />
                            </Box>
                        </Grid>

                        {/* Compensation */}
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Compensation & Benefits
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        label="Min Salary"
                                        name="minSalary"
                                        value={jobData.minSalary}
                                        onChange={handleInputChange}
                                        fullWidth
                                        type="number"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        label="Max Salary"
                                        name="maxSalary"
                                        value={jobData.maxSalary}
                                        onChange={handleInputChange}
                                        fullWidth
                                        type="number"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <FormControl fullWidth>
                                        <InputLabel>Salary Type</InputLabel>
                                        <Select
                                            name="salaryType"
                                            value={jobData.salaryType}
                                            label="Salary Type"
                                            onChange={handleInputChange}
                                        >
                                            <MenuItem value="yearly">Yearly</MenuItem>
                                            <MenuItem value="monthly">Monthly</MenuItem>
                                            <MenuItem value="hourly">Hourly</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                        <Typography variant="subtitle1">
                                            Benefits
                                        </Typography>
                                        <Button
                                            startIcon={<AddIcon />}
                                            onClick={() => addArrayItem('benefits')}
                                            color="primary"
                                            size="small"
                                        >
                                            Add Benefit
                                        </Button>
                                    </Box>
                                    {jobData.benefits.map((benefit, index) => (
                                        <Box key={index} display="flex" alignItems="center" mb={1}>
                                            <TextField
                                                label={`Benefit ${index + 1}`}
                                                value={benefit}
                                                onChange={(e) => handleArrayItemChange(e, index, 'benefits')}
                                                fullWidth
                                                margin="dense"
                                                placeholder="e.g., Health Insurance, 401k, Remote Work"
                                            />
                                            <IconButton
                                                color="error"
                                                onClick={() => removeArrayItem(index, 'benefits')}
                                                disabled={jobData.benefits.length === 1}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Additional Details */}
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Additional Details
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Application Deadline *"
                                        name="applicationDeadline"
                                        value={jobData.applicationDeadline}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="External Application URL"
                                        name="applicationUrl"
                                        value={jobData.applicationUrl}
                                        onChange={handleInputChange}
                                        fullWidth
                                        placeholder="Leave blank to use TalentBridge's application system"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={jobData.visaSponsorshipAvailable}
                                                onChange={handleSwitchChange}
                                                name="visaSponsorshipAvailable"
                                            />
                                        }
                                        label="Visa Sponsorship Available"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Company Overview (Optional)"
                                        name="companyOverview"
                                        value={jobData.companyOverview}
                                        onChange={handleInputChange}
                                        fullWidth
                                        multiline
                                        rows={3}
                                        placeholder="Brief overview of your company to attract candidates..."
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={jobData.visible}
                                                onChange={handleSwitchChange}
                                                name="visible"
                                            />
                                        }
                                        label="Make job visible to candidates immediately"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Submit Buttons */}
                        <Grid item xs={12}>
                            <Divider sx={{ my: 2 }} />
                            <Box display="flex" justifyContent="flex-end" mt={2}>
                                <Button
                                    variant="outlined"
                                    sx={{ mr: 2 }}
                                    onClick={() => navigate('/enterprise/dashboard')}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    startIcon={success ? <CheckIcon /> : <SaveIcon />}
                                    disabled={submitting || success}
                                >
                                    {submitting ? (
                                        <>
                                            <CircularProgress size={24} sx={{ mr: 1 }} />
                                            Posting...
                                        </>
                                    ) : success ? (
                                        'Posted Successfully!'
                                    ) : (
                                        'Post Job'
                                    )}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
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

export default PostJob;