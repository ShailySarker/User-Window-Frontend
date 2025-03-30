import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;