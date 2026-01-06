import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, permission }) => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Permission Check
    if (permission) {
        if (!user) return null; // Wait for user load if needed, but usually loaded with auth

        const isAdmin = user.role === 'admin';
        const hasPermission = user.permissions?.includes(permission);

        if (!isAdmin && !hasPermission) {
            // User doesn't have permission
            return <Navigate to="/" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
