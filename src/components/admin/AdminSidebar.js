import React, { useState } from 'react';
import '../../styles/base.css';

const AdminSidebar = ({ onNavigate, activeItem = 'dashboard' }) => {
    const [collapsed, setCollapsed] = useState(false);

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'users', label: 'User Management', icon: '👥' },
        { id: 'enterprises', label: 'Enterprise Approvals', icon: '🏢' },
        { id: 'statistics', label: 'Statistics', icon: '📈' },
        { id: 'settings', label: 'Settings', icon: '⚙️' }
    ];

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className={`admin-sidebar ${collapsed ? 'admin-sidebar-collapsed' : ''}`}>
            <div className="admin-sidebar-header">
                <h2 className="admin-sidebar-title">
                    {!collapsed && 'Admin Portal'}
                    {collapsed && 'AP'}
                </h2>
                <button
                    className="admin-sidebar-toggle"
                    onClick={toggleSidebar}
                    aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {collapsed ? '→' : '←'}
                </button>
            </div>

            <nav className="admin-sidebar-nav">
                <ul className="admin-sidebar-menu">
                    {menuItems.map(item => (
                        <li
                            key={item.id}
                            className={`admin-sidebar-item ${activeItem === item.id ? 'admin-sidebar-item-active' : ''}`}
                            onClick={() => onNavigate(item.id)}
                        >
                            <span className="admin-sidebar-icon">{item.icon}</span>
                            {!collapsed && <span className="admin-sidebar-label">{item.label}</span>}
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="admin-sidebar-footer">
                {!collapsed && <span>Admin v1.0</span>}
            </div>
        </div>
    );
};

export default AdminSidebar;