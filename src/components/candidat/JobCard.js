import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
    // Default values if job prop is not provided
    const {
        _id = '',
        title = 'Software Developer',
        company = 'Tech Company',
        location = 'Remote',
        salary = '$80K - $120K',
        jobType = 'Full-time',
        postedDate = new Date(),
        deadline = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        description = 'Job description not available',
        skills = ['React', 'Node.js', 'MongoDB'],
    } = job || {};

    // Format dates
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    // Calculate days left until deadline
    const daysLeft = () => {
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const diffTime = deadlineDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <p className="text-gray-600 mb-2">{company} • {location}</p>

                    <div className="flex items-center text-sm text-gray-500 mb-4">
            <span className="mr-3">
              <i className="fas fa-money-bill-wave mr-1"></i> {salary}
            </span>
                        <span className="mr-3">
              <i className="fas fa-briefcase mr-1"></i> {jobType}
            </span>
                        <span>
              <i className="fas fa-clock mr-1"></i> Posted {formatDate(postedDate)}
            </span>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-2">{description}</p>

                    <div className="mb-4">
                        {skills.map((skill, index) => (
                            <span
                                key={index}
                                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 mb-2"
                            >
                {skill}
              </span>
                        ))}
                    </div>
                </div>

                <div className="text-right">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              daysLeft() < 3 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }`}>
            {daysLeft()} days left
          </span>
                </div>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                <Link
                    to={`/candidat/jobs/${_id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                >
                    View Details
                </Link>
                <Link
                    to={`/candidat/apply/${_id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                    Apply Now
                </Link>
            </div>
        </div>
    );
};

export default JobCard;