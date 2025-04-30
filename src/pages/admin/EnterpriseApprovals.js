import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EnterpriseApprovals = () => {
    const [enterprises, setEnterprises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('pending');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchEnterprises();
    }, [filterStatus]);

    const fetchEnterprises = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/admin/enterprises?status=${filterStatus}`);
            setEnterprises(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching enterprises:', error);
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            await axios.put(`/api/admin/enterprises/${id}/approve`);
            // Update the local state to reflect the change
            setEnterprises(enterprises.map(enterprise =>
                enterprise._id === id ? { ...enterprise, status: 'approved' } : enterprise
            ));
        } catch (error) {
            console.error('Error approving enterprise:', error);
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.put(`/api/admin/enterprises/${id}/reject`);
            // Update the local state to reflect the change
            setEnterprises(enterprises.map(enterprise =>
                enterprise._id === id ? { ...enterprise, status: 'rejected' } : enterprise
            ));
        } catch (error) {
            console.error('Error rejecting enterprise:', error);
        }
    };

    const filteredEnterprises = enterprises.filter(enterprise =>
        enterprise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enterprise.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Enterprise Approvals</h1>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <div className="flex mb-4 md:mb-0">
                    <button
                        className={`px-4 py-2 mr-2 rounded-lg ${filterStatus === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setFilterStatus('pending')}
                    >
                        Pending
                    </button>
                    <button
                        className={`px-4 py-2 mr-2 rounded-lg ${filterStatus === 'approved' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setFilterStatus('approved')}
                    >
                        Approved
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg ${filterStatus === 'rejected' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setFilterStatus('rejected')}
                    >
                        Rejected
                    </button>
                </div>

                <div className="w-full md:w-1/3">
                    <input
                        type="text"
                        placeholder="Search enterprises..."
                        className="w-full px-4 py-2 border rounded-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Enterprises Table */}
            {loading ? (
                <div className="flex justify-center items-center h-64">Loading enterprises...</div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied On</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {filteredEnterprises.length > 0 ? (
                            filteredEnterprises.map((enterprise) => (
                                <tr key={enterprise._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-gray-900">{enterprise.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{enterprise.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{enterprise.industry}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${enterprise.status === 'approved' ? 'bg-green-100 text-green-800' :
                          enterprise.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'}`}>
                        {enterprise.status.charAt(0).toUpperCase() + enterprise.status.slice(1)}
                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {new Date(enterprise.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {enterprise.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => handleApprove(enterprise._id)}
                                                    className="text-green-600 hover:text-green-900 mr-4"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleReject(enterprise._id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                        {enterprise.status !== 'pending' && (
                                            <button
                                                onClick={() => window.location.href = `/admin/enterprises/${enterprise._id}`}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                View Details
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                    No enterprises found
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EnterpriseApprovals;