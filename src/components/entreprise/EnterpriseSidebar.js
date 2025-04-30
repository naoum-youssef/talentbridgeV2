import React, { useState } from 'react';
import '../../../styles/base.css';

const EnterpriseSidebar = ({ onNavigate, activeItem = 'dashboard' }) => {
    const [collapsed, setCollapsed] = useState(false);

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'post-job', label: 'Post Job', icon: '📝' },
        { id: 'applications', label: 'Applications', icon: '📄' },
        { id: 'candidates', label: 'Candidates', icon: '👥' },
        { id: 'profile', label: 'Company Profile', icon: '🏢' },
        { id: 'analytics', label: 'Analytics', icon: '📈' }
    ];

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className={`enterprise-sidebar ${collapsed ? 'enterprise-sidebar-collapsed' : ''}`}>
            <div className="enterprise-sidebar-header">
                <h2 className="enterprise-sidebar-title">
                    {!collapsed && 'Enterprise Portal'}
                    {collapsed && 'EP'}
                </h2>
                <button
                    className="enterprise-sidebar-toggle"
                    onClick={toggleSidebar}
                    aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {collapsed ? '>' : '<'}
                </button>
            </div>

            <nav className="enterprise-sidebar-nav">
                <ul className="enterprise-sidebar-menu">
                    {menuItems.map((item) => (
                        <li key={item.id} className={`enterprise-sidebar-item ${activeItem === item.id ? 'active' : ''}`}>
                            <button
                                className="enterprise-sidebar-link"
                                onClick={() => onNavigate(item.id)}
                                aria-current={activeItem === item.id ? 'page' : undefined}
                            >
                                <span className="enterprise-sidebar-icon">{item.icon}</span>
                                {!collapsed && <span className="enterprise-sidebar-label">{item.label}</span>}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="enterprise-sidebar-footer">
                <button className="enterprise-sidebar-logout">
                    <span className="enterprise-sidebar-icon">🚪</span>
                    {!collapsed && <span className="enterprise-sidebar-label">Logout</span>}
                </button>
            </div>
        </div>
    );
};

export default EnterpriseSidebar;