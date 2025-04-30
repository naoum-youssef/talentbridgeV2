import React, { useState } from 'react';
import '../../styles/base.css';

const UserManagementTable = ({
                                 users = [],
                                 onEditUser,
                                 onDeleteUser,
                                 onViewUserDetails,
                                 onRoleChange
                             }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({
        key: 'name',
        direction: 'ascending'
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const usersPerPage = 10;

    // Handle search
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };

    // Handle sorting
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Get sorted, filtered users
    const getSortedUsers = () => {
        const filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (!sortConfig.key) return filteredUsers;

        return [...filteredUsers].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    };

    // Handle pagination
    const sortedUsers = getSortedUsers();
    const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle user selection
    const toggleUserSelection = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    // Handle select all
    const toggleSelectAll = () => {
        if (selectedUsers.length === currentUsers.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(currentUsers.map(user => user.id));
        }
    };

    // Get class for sorted column
    const getSortClass = (key) => {
        if (sortConfig.key !== key) return '';
        return sortConfig.direction === 'ascending' ? 'sort-asc' : 'sort-desc';
    };

    return (
        <div className="user-management">
            <div className="user-management-toolbar">
                <div className="user-management-search">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="form-input"
                    />
                </div>
                <div className="user-management-actions">
                    {selectedUsers.length > 0 && (
                        <>
                            <button
                                className="button button-small"
                                onClick={() => onRoleChange(selectedUsers)}
                            >
                                Change Role
                            </button>
                            <button
                                className="button button-small button-error"
                                onClick={() => {
                                    onDeleteUser(selectedUsers);
                                    setSelectedUsers([]);
                                }}
                            >
                                Delete Selected
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="user-management-table-wrapper">
                <table className="user-management-table">
                    <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={selectedUsers.length === currentUsers.length && currentUsers.length > 0}
                                onChange={toggleSelectAll}
                            />
                        </th>
                        <th
                            className={getSortClass('name')}
                            onClick={() => requestSort('name')}
                        >
                            Name
                        </th>
                        <th
                            className={getSortClass('email')}
                            onClick={() => requestSort('email')}
                        >
                            Email
                        </th>
                        <th
                            className={getSortClass('role')}
                            onClick={() => requestSort('role')}
                        >
                            Role
                        </th>
                        <th
                            className={getSortClass('status')}
                            onClick={() => requestSort('status')}
                        >
                            Status
                        </th>
                        <th
                            className={getSortClass('lastLogin')}
                            onClick={() => requestSort('lastLogin')}
                        >
                            Last Login
                        </th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentUsers.map(user => (
                        <tr key={user.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.includes(user.id)}
                                    onChange={() => toggleUserSelection(user.id)}
                                />
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                    <span className={`badge badge-${user.role.toLowerCase()}`}>
                                        {user.role}
                                    </span>
                            </td>
                            <td>
                                    <span className={`status-indicator status-${user.status.toLowerCase()}`}>
                                        {user.status}
                                    </span>
                            </td>
                            <td>{user.lastLogin}</td>
                            <td className="user-management-actions-cell">
                                <button
                                    className="icon-button"
                                    onClick={() => onViewUserDetails(user.id)}
                                    aria-label="View details"
                                >
                                    👁️
                                </button>
                                <button
                                    className="icon-button"
                                    onClick={() => onEditUser(user.id)}
                                    aria-label="Edit user"
                                >
                                    ✏️
                                </button>
                                <button
                                    className="icon-button"
                                    onClick={() => onDeleteUser([user.id])}
                                    aria-label="Delete user"
                                >
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    ))}

                    {currentUsers.length === 0 && (
                        <tr>
                            <td colSpan="7" className="user-management-empty">
                                {searchTerm ? 'No users found matching your search' : 'No users available'}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="user-management-pagination">
                    <button
                        className="pagination-button"
                        disabled={currentPage === 1}
                        onClick={() => paginate(currentPage - 1)}
                    >
                        &laquo;
                    </button>

                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            className={`pagination-button ${currentPage === index + 1 ? 'pagination-active' : ''}`}
                            onClick={() => paginate(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        className="pagination-button"
                        disabled={currentPage === totalPages}
                        onClick={() => paginate(currentPage + 1)}
                    >
                        &raquo;
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserManagementTable;