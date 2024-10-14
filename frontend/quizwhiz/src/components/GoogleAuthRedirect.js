import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function GoogleAuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to UserPage after successful authentication
    // navigate('/UserPage');
    console.log("UserPage");
  }, [navigate]);

  return <p>Redirecting...</p>;
}

export default GoogleAuthRedirect;
