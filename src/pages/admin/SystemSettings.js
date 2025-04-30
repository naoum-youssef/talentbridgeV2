import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SystemSettings = () => {
    const [settings, setSettings] = useState({
        siteTitle: '',
        siteDescription: '',
        contactEmail: '',
        maintenanceMode: false,
        allowUserRegistration: true,
        autoApproveEnterprises: false,
        emailNotifications: true,
        maxJobPostingsPerEnterprise: 10,
        jobPostingExpiryDays: 30,
        fileUploadSizeLimit: 5,
        defaultUserRole: 'candidate',
        termsAndConditionsLastUpdated: '',
    });

    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');
    const [activeTab, setActiveTab] = useState('general');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/admin/settings');
            setSettings(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching settings:', error);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings({
            ...settings,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleNumberInputChange = (e) => {
        const { name, value } = e.target;
        setSettings({
            ...settings,
            [name]: parseInt(value, 10),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSaving(true);
            await axios.put('/api/admin/settings', settings);
            setSaveMessage('Settings saved successfully!');
            setTimeout(() => setSaveMessage(''), 3000);
        } catch (error) {
            console.error('Error saving settings:', error);
            setSaveMessage('Error saving settings. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading settings...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">System Settings</h1>

            {/* Settings Tabs */}
            <div className="mb-6 border-b border-gray-200">
                <ul className="flex flex-wrap -mb-px">
                    <li className="mr-2">
                        <button
                            className={`inline-block p-4 rounded-t-lg ${
                                activeTab === 'general'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-600 hover:border-gray-300'
                            }`}
                            onClick={() => setActiveTab('general')}
                        >
                            General
                        </button>
                    </li>
                    <li className="mr-2">
                        <button
                            className={`inline-block p-4 rounded-t-lg ${
                                activeTab === 'user'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-600 hover:border-gray-300'
                            }`}
                            onClick={() => setActiveTab('user')}
                        >
                            User Registration
                        </button>
                    </li>
                    <li className="mr-2">
                        <button
                            className={`inline-block p-4 rounded-t-lg ${
                                activeTab === 'jobs'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-600 hover:border-gray-300'
                            }`}
                            onClick={() => setActiveTab('jobs')}
                        >
                            Job Settings
                        </button>
                    </li>
                    <li>
                        <button
                            className={`inline-block p-4 rounded-t-lg ${
                                activeTab === 'email'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-600 hover:border-gray-300'
                            }`}
                            onClick={() => setActiveTab('email')}
                        >
                            Email Settings
                        </button>
                    </li>
                </ul>
            </div>

            {saveMessage && (
                <div className={`p-4 mb-6 rounded-lg ${
                    saveMessage.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}>
                    {saveMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
                {/* General Settings */}
                {activeTab === 'general' && (
                    <div>
                        <h2 className="text-lg font-semibold mb-4">General Settings</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Site Title
                                </label>
                                <input
                                    type="text"
                                    name="siteTitle"
                                    value={settings.siteTitle}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Contact Email
                                </label>
                                <input
                                    type="email"
                                    name="contactEmail"
                                    value={settings.contactEmail}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Site Description
                                </label>
                                <textarea
                                    name="siteDescription"
                                    value={settings.siteDescription}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    rows="3"
                                />
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="maintenanceMode"
                                    checked={settings.maintenanceMode}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-gray-700 text-sm font-bold">
                                    Maintenance Mode
                                </label>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    File Upload Size Limit (MB)
                                </label>
                                <input
                                    type="number"
                                    name="fileUploadSizeLimit"
                                    value={settings.fileUploadSizeLimit}
                                    onChange={handleNumberInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    min="1"
                                    max="50"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* User Registration Settings */}
                {activeTab === 'user' && (
                    <div>
                        <h2 className="text-lg font-semibold mb-4">User Registration Settings</h2>
                        <div className="grid grid-cols-1 gap-6">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="allowUserRegistration"
                                    checked={settings.allowUserRegistration}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-gray-700 text-sm font-bold">
                                    Allow User Registration
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="autoApproveEnterprises"
                                    checked={settings.autoApproveEnterprises}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-gray-700 text-sm font-bold">
                                    Auto-approve Enterprise Accounts
                                </label>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Default User Role
                                </label>
                                <select
                                    name="defaultUserRole"
                                    value={settings.defaultUserRole}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option value="candidate">Candidate</option>
                                    <option value="enterprise">Enterprise</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Terms and Conditions Last Updated
                                </label>
                                <input
                                    type="date"
                                    name="termsAndConditionsLastUpdated"
                                    value={settings.termsAndConditionsLastUpdated}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Job Settings */}
                {activeTab === 'jobs' && (
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Job Settings</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Max Job Postings Per Enterprise
                                </label>
                                <input
                                    type="number"
                                    name="maxJobPostingsPerEnterprise"
                                    value={settings.maxJobPostingsPerEnterprise}
                                    onChange={handleNumberInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    min="1"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Job Posting Expiry Days
                                </label>
                                <input
                                    type="number"
                                    name="jobPostingExpiryDays"
                                    value={settings.jobPostingExpiryDays}
                                    onChange={handleNumberInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    min="1"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Email Settings */}
                {activeTab === 'email' && (
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Email Settings</h2>
                        <div className="grid grid-cols-1 gap-6">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="emailNotifications"
                                    checked={settings.emailNotifications}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-gray-700 text-sm font-bold">
                                    Enable Email Notifications
                                </label>
                            </div>
                            {/* More email settings can be added here */}
                        </div>
                    </div>
                )}

                <div className="mt-8 flex justify-end">
                    <button
                        type="button"
                        onClick={fetchSettings}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        disabled={isSaving}
                    >
                        {isSaving ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SystemSettings;