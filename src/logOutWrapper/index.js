import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInBasic from 'layouts/authentication/sign-in/basic';

const LogoutWrapper = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    navigate('/authentication/login'); // Ensure the user is redirected to the login page
  }, [navigate]);

  return <SignInBasic />;
};

export default LogoutWrapper;
