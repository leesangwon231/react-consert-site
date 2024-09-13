<<<<<<< HEAD
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(-1); 
    }, 5000);
 
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1><strong>404 - Page Not Found</strong></h1>
      <p><h4>Sorry, the page you are looking for does not exist.</h4></p>
      
      <button onClick={() => navigate(-1)} style={{ padding: '10px 20px', marginTop: '20px', borderRadius:"8px" }}>
        Go Back
      </button>
      <p><h5>You will be redirected in 5 seconds...</h5></p>
    </div>
  );
};

export default NotFoundPage;
=======

const NotFoundPage = () => {
    return (
      <div>NotFoundPage</div>
    )
  }
  
  export default NotFoundPage
>>>>>>> SearchPage
