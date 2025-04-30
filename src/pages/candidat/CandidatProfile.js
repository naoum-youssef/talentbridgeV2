import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const CandidatProfile = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        title: '',
        location: '',
        bio: '',
        skills: [],
        experience: [],
        education: []
    });
    const [newSkill, setNewSkill] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/candidates/profile/${currentUser.id}`);
                if (response.data) {
                    setProfile(response.data);
                }
                setLoading(false);
            } catch (err) {
                setError('Failed to load profile data. Please try again later.');
                setLoading(false);
            }
        };

        if (currentUser?.id) {
            fetchProfile();
        } else {
            navigate('/auth/login');
        }
    }, [currentUser, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSkillAdd = () => {
        if (newSkill.trim() !== '' && !profile.skills.includes(newSkill.trim())) {
            setProfile(prev => ({
                ...prev,
                skills: [...prev.skills, newSkill.trim()]
            }));
            setNewSkill('');
        }
    };

    const handleSkillRemove = (skillToRemove) => {
        setProfile(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill !== skillToRemove)
        }));
    };

    const handleExperienceAdd = () => {
        setProfile(prev => ({
            ...prev,
            experience: [...prev.experience, {
                id: Date.now(),
                company: '',
                title: '',
                location: '',
                startDate: '',
                endDate: '',
                current: false,
                description: ''
            }]
        }));
    };

    const handleExperienceChange = (id, field, value) => {
        setProfile(prev => ({
            ...prev,
            experience: prev.experience.map(exp =>
                exp.id === id ? { ...exp, [field]: value } : exp
            )
        }));
    };

    const handleExperienceRemove = (id) => {
        setProfile(prev => ({
            ...prev,
            experience: prev.experience.filter(exp => exp.id !== id)
        }));
    };

    const handleEducationAdd = () => {
        setProfile(prev => ({
            ...prev,
            education: [...prev.education, {
                id: Date.now(),
                institution: '',
                degree: '',
                field: '',
                startDate: '',
                endDate: '',
                current: false
            }]
        }));
    };

    const handleEducationChange = (id, field, value) => {
        setProfile(prev => ({
            ...prev,
            education: prev.education.map(edu =>
                edu.id === id ? { ...edu, [field]: value } : edu
            )
        }));
    };

    const handleEducationRemove = (id) => {
        setProfile(prev => ({
            ...prev,
            education: prev.education.filter(edu => edu.id !== id)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setSuccessMessage('');
            const response = await axios.put(`/api/candidates/profile/${currentUser.id}`, profile);
            if (response.status === 200) {
                setSuccessMessage('Profile updated successfully!');
                setEditMode(false);
                setTimeout(() => setSuccessMessage(''), 3000);
            }
        } catch (err) {
            setError('Failed to update profile. Please try again later.');
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading profile...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Candidate Profile</h1>
                <button
                    onClick={() => setEditMode(!editMode)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    {editMode ? 'Cancel' : 'Edit Profile'}
                </button>
            </div>

            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
            {successMessage && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{successMessage}</div>}

            <form onSubmit={handleSubmit}>
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 mb-1">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={profile.firstName}
                                onChange={handleChange}
                                disabled={!editMode}
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={profile.lastName}
                                onChange={handleChange}
                                disabled={!editMode}
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={profile.email}
                                onChange={handleChange}
                                disabled={!editMode}
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={profile.phone}
                                onChange={handleChange}
                                disabled={!editMode}
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Professional Title</label>
                            <input
                                type="text"
                                name="title"
                                value={profile.title}
                                onChange={handleChange}
                                disabled={!editMode}
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={profile.location}
                                onChange={handleChange}
                                disabled={!editMode}
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700 mb-1">Bio</label>
                        <textarea
                            name="bio"
                            value={profile.bio}
                            onChange={handleChange}
                            disabled={!editMode}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={4}
                        />
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Skills</h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {profile.skills.map((skill, index) => (
                            <div key={index} className="bg-gray-100 rounded-full px-3 py-1 flex items-center">
                                <span>{skill}</span>
                                {editMode && (
                                    <button
                                        type="button"
                                        onClick={() => handleSkillRemove(skill)}
                                        className="ml-2 text-red-500 hover:text-red-700"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    {editMode && (
                        <div className="flex">
                            <input
                                type="text"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Add a skill"
                            />
                            <button
                                type="button"
                                onClick={handleSkillAdd}
                                className="px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700"
                            >
                                Add
                            </button>
                        </div>
                    )}
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Experience</h2>
                        {editMode && (
                            <button
                                type="button"
                                onClick={handleExperienceAdd}
                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                            >
                                Add Experience
                            </button>
                        )}
                    </div>

                    {profile.experience.length === 0 ? (
                        <p className="text-gray-500">No experience added yet.</p>
                    ) : (
                        profile.experience.map((exp) => (
                            <div key={exp.id} className="border-b pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
                                {editMode ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-700 mb-1">Company</label>
                                            <input
                                                type="text"
                                                value={exp.company}
                                                onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-1">Title</label>
                                            <input
                                                type="text"
                                                value={exp.title}
                                                onChange={(e) => handleExperienceChange(exp.id, 'title', e.target.value)}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-1">Location</label>
                                            <input
                                                type="text"
                                                value={exp.location}
                                                onChange={(e) => handleExperienceChange(exp.id, 'location', e.target.value)}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-1">Start Date</label>
                                            <input
                                                type="date"
                                                value={exp.startDate}
                                                onChange={(e) => handleExperienceChange(exp.id, 'startDate', e.target.value)}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-1">End Date</label>
                                            <input
                                                type="date"
                                                value={exp.endDate}
                                                onChange={(e) => handleExperienceChange(exp.id, 'endDate', e.target.value)}
                                                disabled={exp.current}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={`current-${exp.id}`}
                                                checked={exp.current}
                                                onChange={(e) => handleExperienceChange(exp.id, 'current', e.target.checked)}
                                                className="mr-2"
                                            />
                                            <label htmlFor={`current-${exp.id}`}>I currently work here</label>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-gray-700 mb-1">Description</label>
                                            <textarea
                                                value={exp.description}
                                                onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                rows={3}
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <button
                                                type="button"
                                                onClick={() => handleExperienceRemove(exp.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Remove this experience
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <h3 className="text-lg font-medium">{exp.title} at {exp.company}</h3>
                                        <p className="text-gray-600">
                                            {exp.location} • {new Date(exp.startDate).toLocaleDateString()} -
                                            {exp.current ? ' Present' : ` ${new Date(exp.endDate).toLocaleDateString()}`}
                                        </p>
                                        <p className="mt-2">{exp.description}</p>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Education</h2>
                        {editMode && (
                            <button
                                type="button"
                                onClick={handleEducationAdd}
                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                            >
                                Add Education
                            </button>
                        )}
                    </div>

                    {profile.education.length === 0 ? (
                        <p className="text-gray-500">No education added yet.</p>
                    ) : (
                        profile.education.map((edu) => (
                            <div key={edu.id} className="border-b pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
                                {editMode ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-700 mb-1">Institution</label>
                                            <input
                                                type="text"
                                                value={edu.institution}
                                                onChange={(e) => handleEducationChange(edu.id, 'institution', e.target.value)}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-1">Degree</label>
                                            <input
                                                type="text"
                                                value={edu.degree}
                                                onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-1">Field of Study</label>
                                            <input
                                                type="text"
                                                value={edu.field}
                                                onChange={(e) => handleEducationChange(edu.id, 'field', e.target.value)}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-1">Start Date</label>
                                            <input
                                                type="date"
                                                value={edu.startDate}
                                                onChange={(e) => handleEducationChange(edu.id, 'startDate', e.target.value)}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-1">End Date</label>
                                            <input
                                                type="date"
                                                value={edu.endDate}
                                                onChange={(e) => handleEducationChange(edu.id, 'endDate', e.target.value)}
                                                disabled={edu.current}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={`current-edu-${edu.id}`}
                                                checked={edu.current}
                                                onChange={(e) => handleEducationChange(edu.id, 'current', e.target.checked)}
                                                className="mr-2"
                                            />
                                            <label htmlFor={`current-edu-${edu.id}`}>I'm currently studying here</label>
                                        </div>
                                        <div className="md:col-span-2">
                                            <button
                                                type="button"
                                                onClick={() => handleEducationRemove(edu.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Remove this education
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <h3 className="text-lg font-medium">{edu.degree} in {edu.field}</h3>
                                        <p className="text-gray-600">
                                            {edu.institution} • {new Date(edu.startDate).toLocaleDateString()} -
                                            {edu.current ? ' Present' : ` ${new Date(edu.endDate).toLocaleDateString()}`}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {editMode && (
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Save Profile
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default CandidatProfile;