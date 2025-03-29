import React from 'react';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;