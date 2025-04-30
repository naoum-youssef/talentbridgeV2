import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Company info */}
                        <div className="mb-6 md:mb-0">
                            <Link to="/" className="flex items-center mb-4">
                                <img src="/logo-white.svg" alt="TalentBridge Logo" className="h-8 w-auto" />
                                <span className="ml-2 text-xl font-bold">TalentBridge</span>
                            </Link>
                            <p className="text-gray-300 text-sm mb-4">
                                Connecting talented professionals with innovative enterprises.
                            </p>
                            <div className="flex space-x-4">
                                <a href="https://twitter.com/talentbridge" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                                    <span className="sr-only">Twitter</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </a>
                                <a href="https://linkedin.com/company/talentbridge" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                                    <span className="sr-only">LinkedIn</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* For Candidates */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">For Candidates</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link to="/jobs" className="text-gray-300 hover:text-white">Browse Jobs</Link>
                                </li>
                                <li>
                                    <Link to="/profile/create" className="text-gray-300 hover:text-white">Create Profile</Link>
                                </li>
                                <li>
                                    <Link to="/resources/candidates" className="text-gray-300 hover:text-white">Career Resources</Link>
                                </li>
                                <li>
                                    <Link to="/success-stories" className="text-gray-300 hover:text-white">Success Stories</Link>
                                </li>
                            </ul>
                        </div>

                        {/* For Enterprises */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">For Enterprises</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link to="/post-job" className="text-gray-300 hover:text-white">Post a Job</Link>
                                </li>
                                <li>
                                    <Link to="/candidates" className="text-gray-300 hover:text-white">Find Talent</Link>
                                </li>
                                <li>
                                    <Link to="/solutions/enterprise" className="text-gray-300 hover:text-white">Enterprise Solutions</Link>
                                </li>
                                <li>
                                    <Link to="/pricing" className="text-gray-300 hover:text-white">Pricing</Link>
                                </li>
                            </ul>
                        </div>

                        {/* Company Links */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Company</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link to="/about" className="text-gray-300 hover:text-white">About Us</Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="text-gray-300 hover:text-white">Contact Us</Link>
                                </li>
                                <li>
                                    <Link to="/privacy-policy" className="text-gray-300 hover:text-white">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link to="/terms-of-service" className="text-gray-300 hover:text-white">Terms of Service</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom footer */}
                <div className="border-t border-gray-700 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-gray-300">
                            &copy; {currentYear} TalentBridge. All rights reserved.
                        </p>
                        <div className="mt-4 md:mt-0">
                            <ul className="flex space-x-4">
                                <li>
                                    <Link to="/privacy-policy" className="text-xs text-gray-300 hover:text-white">Privacy</Link>
                                </li>
                                <li>
                                    <Link to="/terms-of-service" className="text-xs text-gray-300 hover:text-white">Terms</Link>
                                </li>
                                <li>
                                    <Link to="/cookies" className="text-xs text-gray-300 hover:text-white">Cookies</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;