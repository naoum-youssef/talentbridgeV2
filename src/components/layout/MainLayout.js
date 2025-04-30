import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

/**
 * MainLayout component
 * Serves as the main layout wrapper for most pages
 * Includes the header, main content area, and footer
 */
const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* This is where the child routes will be rendered */}
                    <Outlet />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;