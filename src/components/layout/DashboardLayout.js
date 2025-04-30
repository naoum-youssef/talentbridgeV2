import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming you have this context

/**
 * DashboardLayout component
 * Provides a layout for dashboard pages with a sidebar and content area
 */
const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const {currentUser, isLoading} = useAuth(); // Assuming you have this in your auth context
    const location = useLocation();

    // Close sidebar on mobile when route changes
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call once on initial load

        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty dependency array means this runs once on mount

    // If authentication is still loading, show a loading spinner
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // If user is not authenticated, redirect to login
    if (!currentUser) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    // Function to determine if a link is active
    const isActive = (path) => {
        return location.pathname.startsWith(path) ? 'bg-blue-700' : '';
    };

    // Navigation links based on user role
    const getNavLinks = () => {
        const commonLinks = [
            {to: '/dashboard', label: 'Dashboard', icon: 'home'},
            {to: '/profile', label: 'Profile', icon: 'user'},
            {to: '/notifications', label: 'Notifications', icon: 'bell'},
            {to: '/messages', label: 'Messages', icon: 'mail'},
        ];

        const roleSpecificLinks = {
            admin: [
                {to: '/admin/users', label: 'User Management', icon: 'users'},
                {to: '/admin/enterprises', label: 'Enterprises', icon: 'briefcase'},
                {to: '/admin/candidates', label: 'Candidates', icon: 'user-check'},
                {to: '/admin/analytics', label: 'Analytics', icon: 'chart-bar'},
                {to: '/admin/settings', label: 'Settings', icon: 'settings'},
            ],
            enterprise: [
                {to: '/jobs/post', label: 'Post a Job', icon: 'plus'},
                {to: '/jobs/manage', label: 'Manage Jobs', icon: 'list'},
                {to: '/candidates', label: 'Find Candidates', icon: 'search'},
                {to: '/applications', label: 'Applications', icon: 'file-text'},
                {to: '/enterprise/analytics', label: 'Analytics', icon: 'chart-bar'},
                {to: '/enterprise/settings', label: 'Settings', icon: 'settings'},
            ],
            candidate: [
                {to: '/jobs', label: 'Browse Jobs', icon: 'search'},
                {to: '/applications', label: 'My Applications', icon: 'file-text'},
                {to: '/saved-jobs', label: 'Saved Jobs', icon: 'bookmark'},
                {to: '/candidate/settings', label: 'Settings', icon: 'settings'},
            ],
        };

        return [
            ...commonLinks,
            ...(roleSpecificLinks[currentUser.role] || []),
        ];
    };

    // Handle sidebar toggle
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Render icon based on name
    const renderIcon = (iconName) => {
        switch (iconName) {
            case 'home':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                    </svg>
                );
            case 'user':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"/>
                    </svg>
                );
            case 'bell':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
                    </svg>
                );
            case 'mail':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                );
            case 'users':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                    </svg>
                );
            case 'briefcase':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd"
                              d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                              clipRule="evenodd"/>
                        <path
                            d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
                    </svg>
                );
            case 'user-check':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                );
            case 'chart-bar':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                    </svg>
                );
            case 'settings':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd"
                              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                              clipRule="evenodd"/>
                    </svg>
                );
            case 'plus':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd"
                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                              clipRule="evenodd"/>
                    </svg>
                );
            case 'list':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd"
                              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                              clipRule="evenodd"/>
                    </svg>
                );
            case 'search':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              clipRule="evenodd"/>
                    </svg>
                );
            case 'file-text':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd"
                              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                              clipRule="evenodd"/>
                        <path
                            d="M8 11a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                    </svg>
                );
            case 'bookmark':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
                    </svg>
                );
            default:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"/>
                    </svg>
                );
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div
                className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-blue-800 text-white transition-width duration-300 ease-in-out overflow-hidden fixed h-full md:relative z-30`}>
                {/* Sidebar header */}
                <div className="flex items-center justify-between h-16 px-4 border-b border-blue-700">
                    <div className={`flex items-center ${!isSidebarOpen && 'justify-center w-full'}`}>
                        {isSidebarOpen ? (
                            <Link to="/" className="flex items-center space-x-2">
                                <img src="/logo-white.svg" alt="TalentBridge Logo" className="h-8 w-auto"/>
                                <span className="text-xl font-bold">TalentBridge</span>
                            </Link>
                        ) : (
                            <Link to="/">
                                <img src="/logo-icon-white.svg" alt="TalentBridge" className="h-8 w-auto"/>
                            </Link>
                        )}
                    </div>
                    <button
                        onClick={toggleSidebar}
                        className="md:block hidden text-white focus:outline-none"
                    >
                        {isSidebarOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
                            </svg>
                        )}
                    </button>
                </div>

                {/* Sidebar content */}
                <div className="py-4">
                    <nav className="space-y-1 px-2">
                        {getNavLinks().map((link, index) => (
                            <Link
                                key={index}
                                to={link.to}
                                className={`flex items-center py-2 px-4 rounded-md ${isActive(link.to) ? 'bg-blue-700' : 'hover:bg-blue-700'} transition-colors duration-200`}
                            >
                                <span className="mr-3">{renderIcon(link.icon)}</span>
                                {isSidebarOpen && <span>{link.label}</span>}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Mobile sidebar backdrop */}
            {isSidebarOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Dashboard header */}
                <header className="bg-white shadow-sm z-10">
                    <div className="flex items-center justify-between h-16 px-4">
                        {/* Mobile menu button */}
                        <button
                            onClick={toggleSidebar}
                            className="md:hidden text-gray-500 focus:outline-none"
                        >
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </button>

                        {/* Page title - can be dynamic based on route */}
                        <h1 className="text-xl font-semibold text-gray-800">
                            {location.pathname.split('/').pop().charAt(0).toUpperCase() + location.pathname.split('/').pop().slice(1) || 'Dashboard'}
                        </h1>

                        {/* User dropdown */}
                        <div className="relative">
                            <button className="flex items-center space-x-2 focus:outline-none">
                                <span
                                    className="text-sm font-medium text-gray-700">{currentUser.name || currentUser.email}</span>
                                <img
                                    className="h-8 w-8 rounded-full border border-gray-300"
                                    src={currentUser.profileImage || "https://ui-avatars.com/api/?name=" + (currentUser.name || currentUser.email)}
                                    alt={currentUser.name || "User"}
                                />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Dashboard content */}
                <main className="flex-1 overflow-auto bg-gray-100 p-4">
                    <div className="container mx-auto">
                        <Outlet/>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;