import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileForm = () => {
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        title: '',
        bio: '',
        skills: [],
        experience: [],
        education: [],
        resumeUrl: '',
        linkedinUrl: '',
        githubUrl: '',
        portfolioUrl: '',
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [newSkill, setNewSkill] = useState('');

    // Fetch user profile data on component mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                // Replace with your API endpoint
                const response = await axios.get('/api/candidat/profile');
                if (response.data) {
                    setProfile(response.data);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                setMessage({
                    type: 'error',
                    text: error.response?.data?.message || 'Failed to load profile data'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSkillAdd = () => {
        if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            // Replace with your API endpoint
            const response = await axios.put('/api/candidat/profile', profile);

            setMessage({
                type: 'success',
                text: 'Profile updated successfully!'
            });

            // Clear message after 3 seconds
            setTimeout(() => {
                setMessage({ type: '', text: '' });
            }, 3000);
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Failed to update profile'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">My Profile</h2>

            {message.text && (
                <div className={`p-4 mb-6 rounded-md ${
                    message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Personal Information */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="firstName">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={profile.firstName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="lastName">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={profile.lastName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={profile.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={profile.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="location">
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={profile.location}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
                            Professional Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={profile.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. Full Stack Developer"
                        />
                    </div>
                </div>

                {/* Professional Bio */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="bio">
                        Professional Bio
                    </label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={profile.bio}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tell employers about yourself..."
                    ></textarea>
                </div>

                {/* Skills */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                        Skills
                    </label>
                    <div className="flex flex-wrap mb-3">
                        {profile.skills.map((skill, index) => (
                            <div
                                key={index}
                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full mr-2 mb-2 flex items-center"
                            >
                                {skill}
                                <button
                                    type="button"
                                    onClick={() => handleSkillRemove(skill)}
                                    className="ml-2 text-blue-600 hover:text-blue-800"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex">
                        <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Add a skill..."
                        />
                        <button
                            type="button"
                            onClick={handleSkillAdd}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md"
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="linkedinUrl">
                            LinkedIn Profile
                        </label>
                        <input
                            type="url"
                            id="linkedinUrl"
                            name="linkedinUrl"
                            value={profile.linkedinUrl}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://linkedin.com/in/yourprofile"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="githubUrl">
                            GitHub Profile
                        </label>
                        <input
                            type="url"
                            id="githubUrl"
                            name="githubUrl"
                            value={profile.githubUrl}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://github.com/yourusername"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="portfolioUrl">
                            Portfolio Website
                        </label>
                        <input
                            type="url"
                            id="portfolioUrl"
                            name="portfolioUrl"
                            value={profile.portfolioUrl}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://yourportfolio.com"
                        />
                    </div>
                </div>

                {/* Resume Upload - This would typically connect to a file upload service */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                        Resume
                    </label>
                    <div className="flex items-center">
                        <input
                            type="file"
                            className="hidden"
                            id="resumeUpload"
                            accept=".pdf,.doc,.docx"
                        />
                        <label
                            htmlFor="resumeUpload"
                            className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md transition-colors"
                        >
                            Upload Resume
                        </label>
                        {profile.resumeUrl && (
                            <span className="ml-3 text-green-600">
                <i className="fas fa-check-circle mr-1"></i> Resume uploaded
              </span>
                        )}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save Profile'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileForm;