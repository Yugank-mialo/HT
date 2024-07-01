import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ component: Component }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (location.pathname === '/authentication/login') {
      localStorage.removeItem('token');
    }
  }, [location]);

  if (!token) {
    localStorage.removeItem('token'); 
    return <Navigate to="/authentication/login" />;
  }

  return <Component />;
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
