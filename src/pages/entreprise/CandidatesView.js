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
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    InputAdornment,
    Snackbar,
    Alert,
    CircularProgress,
    Tabs,
    Tab,
    Divider,
    Card,
    CardContent,
    CardActions
} from '@mui/material';
import {
    Search as SearchIcon,
    FilterList as FilterIcon,
    Add as AddIcon,
    Visibility as ViewIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Person as PersonIcon,
    Save as SaveIcon,
    Close as CloseIcon,
    MoreVert as MoreIcon,
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    Star as StarIcon,
    StarBorder as StarBorderIcon
} from '@mui/icons-material';

const CandidatesView = () => {
    // Get enterprise ID from auth context or localStorage
    const enterpriseId = localStorage.getItem('enterpriseId') || '60a1b2c3d4e5f6a7b8c9d0e1';

    const [candidates, setCandidates] = useState([]);
    const [filteredCandidates, setFilteredCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [openCandidateDialog, setOpenCandidateDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [currentCandidate, setCurrentCandidate] = useState(null);
    const [candidateForm, setCandidateForm] = useState({
        name: '',
        email: '',
        phone: '',
        position: '',
        status: 'applied',
        skills: '',
        experience: '',
        resumeUrl: '',
        notes: ''
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    const [tabValue, setTabValue] = useState(0);

    const statuses = [
        { value: 'all', label: 'All Statuses' },
        { value: 'applied', label: 'Applied' },
        { value: 'screening', label: 'Screening' },
        { value: 'interview', label: 'Interview' },
        { value: 'technical', label: 'Technical Assessment' },
        { value: 'offer', label: 'Offer Sent' },
        { value: 'hired', label: 'Hired' },
        { value: 'rejected', label: 'Rejected' }
    ];

    const positions = [
        'Software Engineer',
        'Frontend Developer',
        'Backend Developer',
        'Full Stack Developer',
        'DevOps Engineer',
        'Data Scientist',
        'UX/UI Designer',
        'Product Manager',
        'Project Manager',
        'QA Engineer',
        'Technical Writer',
        'Marketing Specialist',
        'HR Specialist',
        'Sales Representative',
        'Other'
    ];

    // Fetch candidates data
    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                setLoading(true);
                // Replace with your actual API endpoint
                const response = await axios.get(`/api/enterprise/${enterpriseId}/candidates`);
                setCandidates(response.data);
                setFilteredCandidates(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCandidates();

        // Use mock data for development
        const mockData = generateMockCandidates(25);
        setCandidates(mockData);
        setFilteredCandidates(mockData);
        setLoading(false);
    }, [enterpriseId]);

    // Filter candidates based on search term and status
    useEffect(() => {
        let results = candidates;

        if (searchTerm) {
            results = results.filter(candidate =>
                candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                candidate.skills.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (statusFilter !== 'all') {
            results = results.filter(candidate => candidate.status === statusFilter);
        }

        setFilteredCandidates(results);
        setPage(0); // Reset to first page when filtering
    }, [searchTerm, statusFilter, candidates]);

    // Handle pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Handle search and filtering
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleStatusFilterChange = (event) => {
        setStatusFilter(event.target.value);
    };

    // Handle candidate form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCandidateForm({
            ...candidateForm,
            [name]: value
        });
    };

    const handleOpenCandidateDialog = (candidate = null) => {
        if (candidate) {
            setCurrentCandidate(candidate);
            setCandidateForm({
                name: candidate.name,
                email: candidate.email,
                phone: candidate.phone || '',
                position: candidate.position,
                status: candidate.status,
                skills: candidate.skills,
                experience: candidate.experience || '',
                resumeUrl: candidate.resumeUrl || '',
                notes: candidate.notes || ''
            });
        } else {
            setCurrentCandidate(null);
            setCandidateForm({
                name: '',
                email: '',
                phone: '',
                position: '',
                status: 'applied',
                skills: '',
                experience: '',
                resumeUrl: '',
                notes: ''
            });
        }
        setOpenCandidateDialog(true);
    };

    const handleCloseCandidateDialog = () => {
        setOpenCandidateDialog(false);
    };

    const handleSubmitCandidate = async () => {
        try {
            if (currentCandidate) {
                // Update existing candidate
                // Replace with your actual API endpoint
                await axios.put(`/api/enterprise/${enterpriseId}/candidates/${currentCandidate.id}`, candidateForm);

                // Update local state
                const updatedCandidates = candidates.map(c =>
                    c.id === currentCandidate.id ? { ...c, ...candidateForm } : c
                );
                setCandidates(updatedCandidates);

                setSnackbar({
                    open: true,
                    message: 'Candidate updated successfully!',
                    severity: 'success'
                });
            } else {
                // Add new candidate
                // Replace with your actual API endpoint
                const response = await axios.post(`/api/enterprise/${enterpriseId}/candidates`, candidateForm);

                // For mock purposes, we'll create a new candidate with an ID
                const newCandidate = {
                    id: Date.now().toString(),
                    ...candidateForm,
                    createdAt: new Date().toISOString()
                };

                setCandidates([newCandidate, ...candidates]);

                setSnackbar({
                    open: true,
                    message: 'Candidate added successfully!',
                    severity: 'success'
                });
            }

            handleCloseCandidateDialog();
        } catch (err) {
            setSnackbar({
                open: true,
                message: `Error: ${err.message}`,
                severity: 'error'
            });
        }
    };

    // Handle delete
    const handleOpenDeleteDialog = (candidate) => {
        setCurrentCandidate(candidate);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleDeleteCandidate = async () => {
        try {
            // Replace with your actual API endpoint
            await axios.delete(`/api/enterprise/${enterpriseId}/candidates/${currentCandidate.id}`);

            // Update local state
            const updatedCandidates = candidates.filter(c => c.id !== currentCandidate.id);
            setCandidates(updatedCandidates);

            setSnackbar({
                open: true,
                message: 'Candidate deleted successfully!',
                severity: 'success'
            });

            handleCloseDeleteDialog();
        } catch (err) {
            setSnackbar({
                open: true,
                message: `Error: ${err.message}`,
                severity: 'error'
            });
        }
    };

    // Handle tabs
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // Handle snackbar
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    // Helper function for status chip color
    const getStatusColor = (status) => {
        switch (status) {
            case 'applied':
                return 'default';
            case 'screening':
                return 'info';
            case 'interview':
                return 'primary';
            case 'technical':
                return 'secondary';
            case 'offer':
                return 'warning';
            case 'hired':
                return 'success';
            case 'rejected':
                return 'error';
            default:
                return 'default';
        }
    };

    // Mock data generator
    const generateMockCandidates = (count) => {
        const statusOptions = ['applied', 'screening', 'interview', 'technical', 'offer', 'hired', 'rejected'];
        const skillsOptions = [
            'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C#', 'SQL', 'NoSQL',
            'AWS', 'Azure', 'Docker', 'Kubernetes', 'UI/UX', 'Figma', 'Agile', 'Scrum'
        ];

        return Array(count).fill().map((_, idx) => {
            const randomSkills = [];
            const skillCount = Math.floor(Math.random() * 5) + 1;

            for (let i = 0; i < skillCount; i++) {
                const skill = skillsOptions[Math.floor(Math.random() * skillsOptions.length)];
                if (!randomSkills.includes(skill)) {
                    randomSkills.push(skill);
                }
            }

            return {
                id: `cand-${idx + 1}`,
                name: `Candidate ${idx + 1}`,
                email: `candidate${idx + 1}@example.com`,
                phone: `+1 555-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
                position: positions[Math.floor(Math.random() * positions.length)],
                status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
                skills: randomSkills.join(', '),
                experience: `${Math.floor(Math.random() * 10) + 1} years`,
                createdAt: new Date(Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)).toISOString(),
                resumeUrl: '',
                notes: Math.random() > 0.5 ? 'Great candidate with strong technical background.' : ''
            };
        });
    };

    // Loading state
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    // Error state
    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <Typography color="error">Error loading candidates: {error}</Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h4" component="h1">
                        Candidates
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => handleOpenCandidateDialog()}
                    >
                        Add Candidate
                    </Button>
                </Box>

                <Box mb={3}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{ mb: 2 }}
                    >
                        <Tab label="All Candidates" />
                        <Tab label="Applied" />
                        <Tab label="Screening" />
                        <Tab label="Interview" />
                        <Tab label="Technical" />
                        <Tab label="Offer" />
                        <Tab label="Hired" />
                        <Tab label="Rejected" />
                    </Tabs>

                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                placeholder="Search candidates by name, email, position or skills"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel>Filter by Status</InputLabel>
                                <Select
                                    value={statusFilter}
                                    label="Filter by Status"
                                    onChange={handleStatusFilterChange}
                                >
                                    {statuses.map(status => (
                                        <MenuItem key={status.value} value={status.value}>
                                            {status.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Position</TableCell>
                                <TableCell>Skills</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Date Applied</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredCandidates
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((candidate) => (
                                    <TableRow key={candidate.id}>
                                        <TableCell>
                                            <Box display="flex" alignItems="center">
                                                <Avatar sx={{ mr: 2 }}>
                                                    {candidate.name.charAt(0)}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="body1">
                                                        {candidate.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {candidate.email}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{candidate.position}</TableCell>
                                        <TableCell>
                                            {candidate.skills.split(',').slice(0, 3).map((skill, idx) => (
                                                <Chip
                                                    key={idx}
                                                    label={skill.trim()}
                                                    size="small"
                                                    sx={{ mr: 0.5, mb: 0.5 }}
                                                />
                                            ))}
                                            {candidate.skills.split(',').length > 3 && (
                                                <Chip
                                                    label={`+${candidate.skills.split(',').length - 3}`}
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                                                color={getStatusColor(candidate.status)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {new Date(candidate.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleOpenCandidateDialog(candidate)}
                                                title="View/Edit"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                onClick={() => handleOpenDeleteDialog(candidate)}
                                                title="Delete"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            {filteredCandidates.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        <Typography variant="body1" py={3}>
                                            No candidates found matching the criteria.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredCandidates.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            {/* Candidate Dialog */}
            <Dialog
                open={openCandidateDialog}
                onClose={handleCloseCandidateDialog}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>
                    {currentCandidate ? `Edit Candidate: ${currentCandidate.name}` : 'Add New Candidate'}
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Name"
                                name="name"
                                value={candidateForm.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Email"
                                name="email"
                                type="email"
                                value={candidateForm.email}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Phone"
                                name="phone"
                                value={candidateForm.phone}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Position</InputLabel>
                                <Select
                                    name="position"
                                    value={candidateForm.position}
                                    label="Position"
                                    onChange={handleInputChange}
                                    required
                                >
                                    {positions.map(position => (
                                        <MenuItem key={position} value={position}>
                                            {position}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Status</InputLabel>
                                <Select
                                    name="status"
                                    value={candidateForm.status}
                                    label="Status"
                                    onChange={handleInputChange}
                                    required
                                >
                                    {statuses.filter(s => s.value !== 'all').map(status => (
                                        <MenuItem key={status.value} value={status.value}>
                                            {status.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Experience"
                                name="experience"
                                value={candidateForm.experience}
                                onChange={handleInputChange}
                                placeholder="e.g., 5 years"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Skills"
                                name="skills"
                                value={candidateForm.skills}
                                onChange={handleInputChange}
                                placeholder="e.g., JavaScript, React, Node.js"
                                helperText="Separate skills with commas"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Resume URL"
                                name="resumeUrl"
                                value={candidateForm.resumeUrl}
                                onChange={handleInputChange}
                                placeholder="https://example.com/resume.pdf"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Notes"
                                name="notes"
                                value={candidateForm.notes}
                                onChange={handleInputChange}
                                multiline
                                rows={4}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCandidateDialog} color="inherit">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmitCandidate} variant="contained" color="primary">
                        {currentCandidate ? 'Update' : 'Add'} Candidate
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete {currentCandidate?.name}? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteCandidate} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
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

export default CandidatesView;