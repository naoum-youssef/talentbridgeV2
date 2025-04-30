import React, { useState, useEffect } from 'react';

const JobListings = () => {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        role: '',
        location: '',
        jobType: 'all',
        remoteOnly: false,
        salary: {
            min: 0,
            max: 250000
        }
    });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Simulate fetching jobs from an API
        const fetchJobs = async () => {
            try {
                // This would be replaced with an actual API call
                setTimeout(() => {
                    const mockJobs = [
                        {
                            id: 1,
                            title: 'Senior Frontend Developer',
                            company: 'TechCorp Inc.',
                            location: 'San Francisco, CA',
                            remote: true,
                            salary: '120K - 150K',
                            type: 'Full-time',
                            description: 'Looking for an experienced Frontend Developer with strong React skills...',
                            posted: '2 days ago',
                            skills: ['React', 'TypeScript', 'CSS3', 'Redux']
                        },
                        {
                            id: 2,
                            title: 'Full Stack Engineer',
                            company: 'Startup Solutions',
                            location: 'New York, NY',
                            remote: false,
                            salary: '100K - 130K',
                            type: 'Full-time',
                            description: 'Join our growing team to build innovative web applications using modern technologies...',
                            posted: '1 week ago',
                            skills: ['Node.js', 'React', 'MongoDB', 'Express']
                        },
                        {
                            id: 3,
                            title: 'Backend Developer',
                            company: 'DataTech Industries',
                            location: 'Remote',
                            remote: true,
                            salary: '90K - 120K',
                            type: 'Full-time',
                            description: 'We are seeking a Backend Developer with expertise in Node.js and database design...',
                            posted: '3 days ago',
                            skills: ['Node.js', 'MongoDB', 'Express', 'AWS']
                        },
                        {
                            id: 4,
                            title: 'UI/UX Designer',
                            company: 'Creative Agency',
                            location: 'Chicago, IL',
                            remote: false,
                            salary: '80K - 110K',
                            type: 'Full-time',
                            description: 'Looking for a talented UI/UX Designer to create engaging user experiences...',
                            posted: '5 days ago',
                            skills: ['Figma', 'Adobe XD', 'User Research', 'Wireframing']
                        },
                        {
                            id: 5,
                            title: 'DevOps Engineer',
                            company: 'Cloud Solutions Ltd',
                            location: 'Austin, TX',
                            remote: true,
                            salary: '110K - 140K',
                            type: 'Contract',
                            description: 'We need a DevOps Engineer to help streamline our deployment processes...',
                            posted: '1 day ago',
                            skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS']
                        }
                    ];

                    setJobs(mockJobs);
                    setIsLoading(false);
                }, 800);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setIsLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFilters({
                ...filters,
                [name]: checked
            });
        } else {
            setFilters({
                ...filters,
                [name]: value
            });
        }
    };

    const handleSalaryChange = (e, field) => {
        setFilters({
            ...filters,
            salary: {
                ...filters.salary,
                [field]: parseInt(e.target.value, 10)
            }
        });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const saveJob = (jobId) => {
        console.log(`Job ${jobId} saved`);
        // This would call an API to save the job to the user's saved jobs
    };

    const applyForJob = (jobId) => {
        console.log(`Applying for job ${jobId}`);
        // This would navigate to an application page or open an application modal
    };

    const filteredJobs = jobs.filter(job => {
        // Filter based on search term
        if (searchTerm && !job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !job.company.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }

        // Filter based on role type
        if (filters.role && !job.title.toLowerCase().includes(filters.role.toLowerCase())) {
            return false;
        }

        // Filter based on location
        if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
            return false;
        }

        // Filter based on job type
        if (filters.jobType !== 'all' && job.type !== filters.jobType) {
            return false;
        }

        // Filter based on remote option
        if (filters.remoteOnly && !job.remote) {
            return false;
        }

        // Filter based on salary range (would need actual numbers for proper comparison)
        // This is a simplification
        const jobMinSalary = parseInt(job.salary.split(' - ')[0].replace('K', '000'), 10);
        if (jobMinSalary < filters.salary.min) {
            return false;
        }

        return true;
    });

    if (isLoading) {
        return <div className="loading">Loading jobs...</div>;
    }

    return (
        <div className="job-listings-container">
            <h2>Find Your Perfect Job</h2>

            <div className="search-and-filters">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search jobs by title, company, or keyword"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button className="search-btn">Search</button>
                </div>

                <div className="filters-section">
                    <h3>Filters</h3>

                    <div className="filter-group">
                        <label>Role/Title</label>
                        <input
                            type="text"
                            name="role"
                            value={filters.role}
                            onChange={handleFilterChange}
                            placeholder="e.g. Frontend Developer"
                        />
                    </div>

                    <div className="filter-group">
                        <label>Location</label>
                        <input
                            type="text"
                            name="location"
                            value={filters.location}
                            onChange={handleFilterChange}
                            placeholder="e.g. New York, Remote"
                        />
                    </div>

                    <div className="filter-group">
                        <label>Job Type</label>
                        <select
                            name="jobType"
                            value={filters.jobType}
                            onChange={handleFilterChange}
                        >
                            <option value="all">All Types</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Internship">Internship</option>
                        </select>
                    </div>

                    <div className="filter-group checkbox">
                        <input
                            type="checkbox"
                            id="remoteOnly"
                            name="remoteOnly"
                            checked={filters.remoteOnly}
                            onChange={handleFilterChange}
                        />
                        <label htmlFor="remoteOnly">Remote Only</label>
                    </div>

                    <div className="filter-group">
                        <label>Salary Range (K)</label>
                        <div className="salary-range">
                            <input
                                type="range"
                                min="0"
                                max="250"
                                value={filters.salary.min / 1000}
                                onChange={(e) => handleSalaryChange(e, 'min')}
                            />
                            <div className="range-values">
                                <span>${filters.salary.min/1000}K</span>
                                <span>${filters.salary.max/1000}K</span>
                            </div>
                        </div>
                    </div>

                    <button className="reset-filters-btn">Reset Filters</button>
                </div>
            </div>

            <div className="job-list">
                <h3>Found {filteredJobs.length} jobs</h3>

                {filteredJobs.length === 0 ? (
                    <div className="no-jobs-found">
                        <p>No jobs match your current filters. Try adjusting your search criteria.</p>
                    </div>
                ) : (
                    filteredJobs.map(job => (
                        <div className="job-card" key={job.id}>
                            <div className="job-card-header">
                                <h4>{job.title}</h4>
                                <div className="job-actions">
                                    <button
                                        className="save-job-btn"
                                        onClick={() => saveJob(job.id)}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="apply-job-btn"
                                        onClick={() => applyForJob(job.id)}
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>

                            <div className="job-company-info">
                                <p className="company-name">{job.company}</p>
                                <p className="job-location">{job.location}</p>
                                {job.remote && <span className="remote-badge">Remote</span>}
                            </div>

                            <div className="job-details">
                                <p className="job-salary">{job.salary}</p>
                                <p className="job-type">{job.type}</p>
                                <p className="job-posted">Posted: {job.posted}</p>
                            </div>

                            <p className="job-description">{job.description}</p>

                            <div className="job-skills">
                                {job.skills.map((skill, index) => (
                                    <span className="skill-tag" key={index}>{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default JobListings;