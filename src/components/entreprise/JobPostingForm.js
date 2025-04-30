import React, { useState } from 'react';
import '../../../styles/forms.css';

const JobPostingForm = ({ onSubmit, initialData = {}, isEditing = false }) => {
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        description: initialData.description || '',
        requirements: initialData.requirements || '',
        location: initialData.location || '',
        type: initialData.type || 'full-time',
        salary: initialData.salary || '',
        department: initialData.department || '',
        deadline: initialData.deadline || '',
        ...initialData
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error when field is edited
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Job title is required';
        if (!formData.description.trim()) newErrors.description = 'Job description is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        if (!formData.type) newErrors.type = 'Job type is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);

        try {
            await onSubmit(formData);
            // Form submission success handling could go here
        } catch (error) {
            // Error handling could go here
            console.error('Error submitting job posting:', error);
            setErrors({ form: 'Failed to save job posting. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="job-posting-form-container">
            <h2 className="form-title">{isEditing ? 'Edit Job Posting' : 'Create New Job Posting'}</h2>

            {errors.form && (
                <div className="form-error-message">{errors.form}</div>
            )}

            <form onSubmit={handleSubmit} className="job-posting-form">
                <div className="form-group">
                    <label htmlFor="title">Job Title*</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={errors.title ? 'input-error' : ''}
                        placeholder="e.g. Senior Software Engineer"
                    />
                    {errors.title && <div className="error-message">{errors.title}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="department">Department</label>
                    <input
                        type="text"
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        placeholder="e.g. Engineering, Marketing, HR"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="type">Job Type*</label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className={errors.type ? 'input-error' : ''}
                        >
                            <option value="full-time">Full-time</option>
                            <option value="part-time">Part-time</option>
                            <option value="contract">Contract</option>
                            <option value="internship">Internship</option>
                            <option value="temporary">Temporary</option>
                        </select>
                        {errors.type && <div className="error-message">{errors.type}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Location*</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className={errors.location ? 'input-error' : ''}
                            placeholder="e.g. Paris, Remote, Hybrid"
                        />
                        {errors.location && <div className="error-message">{errors.location}</div>}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="salary">Salary Range</label>
                    <input
                        type="text"
                        id="salary"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        placeholder="e.g. €50,000 - €70,000 per year"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="deadline">Application Deadline</label>
                    <input
                        type="date"
                        id="deadline"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Job Description*</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className={errors.description ? 'input-error' : ''}
                        rows={5}
                        placeholder="Describe the role, responsibilities, and what a typical day looks like..."
                    ></textarea>
                    {errors.description && <div className="error-message">{errors.description}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="requirements">Requirements & Qualifications</label>
                    <textarea
                        id="requirements"
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleChange}
                        rows={5}
                        placeholder="List required skills, experience, education, certifications..."
                    ></textarea>
                </div>

                <div className="form-actions">
                    <button type="button" className="btn btn-secondary">Cancel</button>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : isEditing ? 'Update Job' : 'Post Job'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default JobPostingForm;