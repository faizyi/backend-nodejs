import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const isAuthenticated = !!JSON.parse(localStorage.getItem('userData'));
    console.log(isAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;