import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming you have an auth context

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { currentUser, logout } = useAuth(); // Assuming you have these in your auth context
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo and brand name */}
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="flex items-center">
                                <img
                                    className="h-8 w-auto"
                                    src="/logo.svg"
                                    alt="TalentBridge Logo"
                                />
                                <span className="ml-2 text-xl font-bold text-blue-600">
                  TalentBridge
                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Desktop menu */}
                    <nav className="hidden md:flex items-center space-x-4">
                        <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                            Dashboard
                        </Link>
                        {currentUser?.role === 'enterprise' && (
                            <Link to="/candidates" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                                Candidates
                            </Link>
                        )}
                        {currentUser?.role === 'candidate' && (
                            <Link to="/jobs" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                                Jobs
                            </Link>
                        )}
                        {currentUser?.role === 'admin' && (
                            <Link to="/admin" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                                Admin Panel
                            </Link>
                        )}
                        <Link to="/profile" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                            Profile
                        </Link>
                        {currentUser ? (
                            <button
                                onClick={handleLogout}
                                className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Login
                            </Link>
                        )}
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                            Dashboard
                        </Link>
                        {currentUser?.role === 'enterprise' && (
                            <Link to="/candidates" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                                Candidates
                            </Link>
                        )}
                        {currentUser?.role === 'candidate' && (
                            <Link to="/jobs" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                                Jobs
                            </Link>
                        )}
                        {currentUser?.role === 'admin' && (
                            <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                                Admin Panel
                            </Link>
                        )}
                        <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                            Profile
                        </Link>
                        {currentUser ? (
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;