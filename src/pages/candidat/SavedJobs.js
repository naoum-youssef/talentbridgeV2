import React, { useState, useEffect } from 'react';

const SavedJobs = () => {
    const [savedJobs, setSavedJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching saved jobs from an API
        const fetchSavedJobs = async () => {
            try {
                // This would be replaced with an actual API call
                setTimeout(() => {
                    const mockSavedJobs = [
                        {
                            id: 201,
                            title: 'Senior Frontend Developer',
                            company: 'TechCorp Inc.',
                            location: 'San Francisco, CA',
                            remote: true,
                            salary: '120K - 150K',
                            type: 'Full-time',
                            description: 'Looking for an experienced Frontend Developer with strong React skills...',
                            datePosted: '2025-04-11T09:30:00',
                            dateSaved: '2025-04-12T14:20:00',
                            skills: ['React', 'TypeScript', 'CSS3', 'Redux'],
                            applied: false
                        },
                        {
                            id: 202,
                            title: 'Machine Learning Engineer',
                            company: 'AI Solutions',
                            location: 'Boston, MA',
                            remote: false,
                            salary: '130K - 160K',
                            type: 'Full-time',
                            description: 'Join our team of ML experts to build cutting-edge AI models...',
                            datePosted: '2025-04-10T11:45:00',
                            dateSaved: '2025-04-11T08:15:00',
                            skills: ['Python', 'TensorFlow', 'PyTorch', 'Computer Vision'],
                            applied: false
                        },
                        {
                            id: 203,
                            title: 'Product Manager',
                            company: 'Startup Innovations',
                            location: 'Remote',
                            remote: true,
                            salary: '110K - 140K',
                            type: 'Full-time',
                            description: 'Looking for a passionate Product Manager to lead our product development...',
                            datePosted: '2025-04-08T10:00:00',
                            dateSaved: '2025-04-09T16:30:00',
                            skills: ['Product Strategy', 'User Research', 'Agile', 'Roadmapping'],
                            applied: true
                        },
                        {
                            id: 204,
                            title: 'Mobile Developer (iOS)',
                            company: 'App Factory',
                            location: 'Miami, FL',
                            remote: true,
                            salary: '100K - 130K',
                            type: 'Contract',
                            description: 'Seeking experienced iOS developer for our consumer app team...',
                            datePosted: '2025-04-07T14:20:00',
                            dateSaved: '2025-04-10T09:45:00',
                            skills: ['Swift', 'Objective-C', 'UIKit', 'Core Data'],
                            applied: false
                        },
                        {
                            id: 205,
                            title: 'Data Scientist',
                            company: 'Data Analytics Co.',
                            location: 'Chicago, IL',
                            remote: false,
                            salary: '115K - 145K',
                            type: 'Full-time',
                            description: 'Join our data science team to extract insights from complex datasets...',
                            datePosted: '2025-04-05T08:30:00',
                            dateSaved: '2025-04-08T11:20:00',
                            skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Data Visualization'],
                            applied: false
                        }
                    ];

                    setSavedJobs(mockSavedJobs);
                    setIsLoading(false);
                }, 800);
            } catch (error) {
                console.error('Error fetching saved jobs:', error);
                setIsLoading(false);
            }
        };

        fetchSavedJobs();
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const removeSavedJob = (jobId) => {
        setSavedJobs(savedJobs.filter(job => job.id !== jobId));
        // This would call an API to remove the job from saved jobs
        console.log(`Job ${jobId} removed from saved jobs`);
    };

    const applyForJob = (jobId) => {
        console.log(`Applying for job ${jobId}`);
        // This would navigate to an application page or open an application modal
    };

    if (isLoading) {
        return <div className="loading">Loading saved jobs...</div>;
    }

    return (
        <div className="saved-jobs-container">
            <h2>Saved Jobs</h2>

            {savedJobs.length === 0 ? (
                <div className="no-saved-jobs">
                    <p>You haven't saved any jobs yet.</p>
                    <button className="browse-jobs-btn">Browse Jobs</button>
                </div>
            ) : (
                <div className="saved-jobs-list">
                    <p className="saved-count">You have saved {savedJobs.length} jobs</p>

                    {savedJobs.map(job => (
                        <div className="saved-job-card" key={job.id}>
                            <div className="job-card-header">
                                <h4>{job.title}</h4>
                                <div className="job-actions">
                                    <button
                                        className="remove-saved-btn"
                                        onClick={() => removeSavedJob(job.id)}
                                    >
                                        Remove
                                    </button>
                                    {!job.applied && (
                                        <button
                                            className="apply-job-btn"
                                            onClick={() => applyForJob(job.id)}
                                        >
                                            Apply
                                        </button>
                                    )}
                                    {job.applied && (
                                        <span className="applied-badge">Applied</span>
                                    )}
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
                                <div className="job-dates">
                                    <p>Posted: {formatDate(job.datePosted)}</p>
                                    <p>Saved: {formatDate(job.dateSaved)}</p>
                                </div>
                            </div>

                            <p className="job-description">{job.description}</p>

                            <div className="job-skills">
                                {job.skills.map((skill, index) => (
                                    <span className="skill-tag" key={index}>{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedJobs;