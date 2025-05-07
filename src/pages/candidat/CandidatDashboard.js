import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const CandidatDashboard = () => {
    // Le hook useAuth doit être appelé de manière inconditionnelle au niveau racine
    const auth = useAuth();
    // Utiliser l'opérateur optionnel pour éviter les erreurs si auth est null ou undefined
    const currentUser = auth?.currentUser || { firstName: "Candidat", lastName: "" };

    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState({
        recentApplications: [],
        upcomingInterviews: [],
        recommendedJobs: [],
        applicationStats: {
            total: 0,
            reviewing: 0,
            interviewed: 0,
            offered: 0,
            rejected: 0
        }
    });

    useEffect(() => {
        const fetchDashboardData = () => {
            try {
                setLoading(true);
                // Simuler un appel API avec setTimeout
                return new Promise(resolve => setTimeout(() => {
                    const mockData = {
                        recentApplications: [
                            {
                                _id: "app1",
                                job: {
                                    _id: "job1",
                                    title: "Senior Frontend Developer",
                                    company: "TechCorp Inc.",
                                    location: "San Francisco, CA"
                                },
                                appliedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                                status: "reviewing",
                                lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
                            },
                            {
                                _id: "app2",
                                job: {
                                    _id: "job2",
                                    title: "Full Stack Engineer",
                                    company: "Startup Solutions",
                                    location: "Remote"
                                },
                                appliedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
                                status: "interviewed",
                                lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
                            }
                        ],
                        upcomingInterviews: [
                            {
                                _id: "int1",
                                jobId: "job2",
                                jobTitle: "Full Stack Engineer",
                                company: "Startup Solutions",
                                interviewType: "Video Call",
                                interviewDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                                duration: 60,
                                location: "Zoom Meeting",
                                confirmed: true,
                                status: "scheduled"
                            }
                        ],
                        recommendedJobs: [
                            {
                                _id: "rec1",
                                title: "Frontend Developer",
                                company: "WebTech Solutions",
                                location: "Remote",
                                salary: "$90K - $120K",
                                jobType: "Full-time",
                                postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                                deadline: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
                                description: "Looking for a skilled Frontend Developer with experience in React and TypeScript.",
                                skills: ["React", "TypeScript", "CSS", "HTML"]
                            },
                            {
                                _id: "rec2",
                                title: "Backend Engineer",
                                company: "Data Systems Inc.",
                                location: "Chicago, IL",
                                salary: "$100K - $130K",
                                jobType: "Full-time",
                                postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                                deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
                                description: "Join our team to build scalable backend systems using Node.js and MongoDB.",
                                skills: ["Node.js", "MongoDB", "Express", "REST API"]
                            }
                        ],
                        applicationStats: {
                            total: 12,
                            reviewing: 5,
                            interviewed: 3,
                            offered: 1,
                            rejected: 2,
                            withdrawn: 1
                        }
                    };

                    setDashboardData(mockData);
                    setLoading(false);
                    resolve();
                }, 1000));
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Formatage de la date pour l'affichage
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Fonction pour obtenir la classe de badge en fonction du statut
    const getStatusBadgeClass = (status) => {
        return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            status === 'applied' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                status === 'reviewing' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' :
                    status === 'interviewed' ? 'bg-purple-100 text-purple-800 border border-purple-300' :
                        status === 'offered' ? 'bg-green-100 text-green-800 border border-green-300' :
                            status === 'rejected' ? 'bg-red-100 text-red-800 border border-red-300' :
                                'bg-gray-100 text-gray-800 border border-gray-300'
        }`;
    };

    // Fonction pour traduire le statut en français
    const translateStatus = (status) => {
        switch (status) {
            case 'applied':
                return 'Postulé';
            case 'reviewing':
                return 'En examen';
            case 'interviewed':
                return 'Entretien passé';
            case 'offered':
                return 'Offre reçue';
            case 'rejected':
                return 'Refusé';
            case 'withdrawn':
                return 'Retiré';
            default:
                return 'Postulé';
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* En-tête */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Bienvenue, {currentUser.firstName} {currentUser.lastName}</h1>
                    <p className="text-gray-600 mt-1">Voici un aperçu de votre activité de recherche d'emploi</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <Link
                        to="/candidat/jobs"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                        Parcourir les offres
                    </Link>
                </div>
            </div>

            {/* Statistiques des candidatures */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Aperçu des candidatures</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="bg-gray-50 p-4 rounded-md text-center">
                        <p className="text-gray-600 text-sm">Total</p>
                        <p className="text-2xl font-bold text-gray-800">{dashboardData.applicationStats.total}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-md text-center">
                        <p className="text-blue-600 text-sm">En examen</p>
                        <p className="text-2xl font-bold text-blue-600">{dashboardData.applicationStats.reviewing}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-md text-center">
                        <p className="text-purple-600 text-sm">Entretiens</p>
                        <p className="text-2xl font-bold text-purple-600">{dashboardData.applicationStats.interviewed}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-md text-center">
                        <p className="text-green-600 text-sm">Offres</p>
                        <p className="text-2xl font-bold text-green-600">{dashboardData.applicationStats.offered}</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-md text-center">
                        <p className="text-red-600 text-sm">Refusés</p>
                        <p className="text-2xl font-bold text-red-600">{dashboardData.applicationStats.rejected}</p>
                    </div>
                </div>
            </div>

            {/* Layout à deux colonnes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Candidatures récentes */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Candidatures récentes</h2>
                        <Link to="/candidat/applications" className="text-blue-600 hover:text-blue-800">
                            Voir tout
                        </Link>
                    </div>

                    {dashboardData.recentApplications.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <p className="text-gray-500">Vous n'avez pas encore postulé à des emplois.</p>
                            <Link
                                to="/candidat/jobs"
                                className="inline-block mt-3 text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Parcourir les offres
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {dashboardData.recentApplications.map((application) => (
                                <div key={application._id} className="bg-white rounded-lg shadow-md p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{application.job.title}</h3>
                                            <p className="text-gray-600 text-sm">{application.job.company} • {application.job.location}</p>
                                        </div>
                                        <span className={getStatusBadgeClass(application.status)}>
                                            {translateStatus(application.status)}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500 mb-3 space-x-2">
                                        <span>Postulé le {formatDate(application.appliedDate)}</span>
                                        <span>•</span>
                                        <span>Mis à jour le {formatDate(application.lastUpdated)}</span>
                                    </div>
                                    <div className="flex justify-end">
                                        <Link
                                            to={`/candidat/applications/${application._id}`}
                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                        >
                                            Voir détails
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Entretiens à venir */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Entretiens à venir</h2>
                        <Link to="/candidat/interviews" className="text-blue-600 hover:text-blue-800">
                            Voir tout
                        </Link>
                    </div>

                    {dashboardData.upcomingInterviews.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <p className="text-gray-500">Aucun entretien n'est programmé.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {dashboardData.upcomingInterviews.map((interview) => (
                                <div key={interview._id} className="bg-white rounded-lg shadow-md p-4">
                                    <div className="mb-3">
                                        <h3 className="font-semibold text-gray-800">{interview.jobTitle}</h3>
                                        <p className="text-gray-600 text-sm">{interview.company}</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                        <div className="flex items-center text-gray-700 text-sm">
                                            <i className="far fa-calendar-alt mr-2 text-gray-500"></i>
                                            <span>{formatDate(interview.interviewDate)}</span>
                                        </div>
                                        <div className="flex items-center text-gray-700 text-sm">
                                            <i className="far fa-clock mr-2 text-gray-500"></i>
                                            <span>{new Date(interview.interviewDate).toLocaleTimeString('fr-FR', {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })} ({interview.duration} min)</span>
                                        </div>
                                        <div className="flex items-center text-gray-700 text-sm">
                                            <i className="fas fa-video mr-2 text-gray-500"></i>
                                            <span>{interview.interviewType}</span>
                                        </div>
                                        <div className="flex items-center text-gray-700 text-sm">
                                            <i className="fas fa-map-marker-alt mr-2 text-gray-500"></i>
                                            <span>{interview.location}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <Link
                                            to={`/candidat/interviews/${interview._id}`}
                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                        >
                                            Voir détails
                                        </Link>
                                        {!interview.confirmed && (
                                            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-1.5 px-3 rounded transition-colors">
                                                Confirmer présence
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Emplois recommandés */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Recommandé pour vous</h2>
                    <Link to="/candidat/jobs" className="text-blue-600 hover:text-blue-800">
                        Voir plus
                    </Link>
                </div>

                {dashboardData.recommendedJobs.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <p className="text-gray-500">Aucune recommandation d'emploi disponible.</p>
                        <p className="text-gray-500 text-sm mt-2">
                            Complétez votre profil pour obtenir des recommandations d'emploi personnalisées.
                        </p>
                        <Link
                            to="/candidat/profile"
                            className="inline-block mt-3 text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Mettre à jour le profil
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {dashboardData.recommendedJobs.map((job) => (
                            <div key={job._id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all">
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{job.title}</h3>
                                    <p className="text-gray-600 mb-1">{job.company}</p>
                                    <p className="text-gray-600 text-sm">{job.location}</p>
                                </div>
                                <div className="mb-4">
                                    <div className="flex space-x-4 mb-2 text-sm text-gray-600">
                                        <span>{job.salary}</span>
                                        <span>{job.jobType}</span>
                                    </div>
                                    <p className="text-gray-700 text-sm line-clamp-2 mb-3">{job.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {job.skills.map((skill, index) => (
                                            <span key={index} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Link
                                        to={`/candidat/jobs/${job._id}`}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        Voir détails
                                    </Link>
                                    <Link
                                        to={`/candidat/apply/${job._id}`}
                                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-1.5 px-3 rounded transition-colors"
                                    >
                                        Postuler
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Complétion du profil */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-1">Complétion du profil</h2>
                        <p className="text-gray-600 text-sm">
                            Complétez votre profil pour augmenter vos chances d'être embauché
                        </p>
                    </div>
                    <Link
                        to="/candidat/profile"
                        className="text-blue-600 hover:text-blue-800 font-medium mt-2 md:mt-0"
                    >
                        Modifier le profil
                    </Link>
                </div>

                <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Complétion du profil</span>
                        <span>75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: "75%" }}
                        ></div>
                    </div>
                </div>

                <div className="mt-4">
                    <h3 className="font-medium text-gray-700 mb-2">Actions suggérées:</h3>
                    <ul className="space-y-2">
                        <li className="flex items-center text-gray-600">
                            <span className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                                <i className="fas fa-check text-green-600"></i>
                            </span>
                            Ajouter expérience professionnelle
                        </li>
                        <li className="flex items-center text-gray-600">
                            <span className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                                <i className="fas fa-check text-green-600"></i>
                            </span>
                            Ajouter formation
                        </li>
                        <li className="flex items-center text-gray-600">
                            <span className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                                <i className="fas fa-times text-red-600"></i>
                            </span>
                            Télécharger votre CV
                        </li>
                        <li className="flex items-center text-gray-600">
                            <span className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                                <i className="fas fa-times text-red-600"></i>
                            </span>
                            Ajouter l'URL de votre portfolio
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CandidatDashboard;