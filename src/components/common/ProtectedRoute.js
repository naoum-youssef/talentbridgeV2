import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import '../../styles/base.css';

const ProtectedRoute = ({
                            isAuthenticated,
                            redirectPath = '/login',
                            children
                        }) => {
    if (!isAuthenticated) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;