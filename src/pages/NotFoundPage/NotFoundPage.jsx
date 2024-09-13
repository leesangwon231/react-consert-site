import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigate(-1); 
  //   }, 5000);
 
  //   return () => clearTimeout(timer);
  // }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      
      {/* 이전 페이지로 이동하는 버튼 */}
      <button onClick={() => navigate(-1)} style={{ padding: '10px 20px', marginTop: '20px' }}>
        Go Back
      </button>
      
      <p>You will be redirected in 5 seconds...</p>
    </div>
  );
};

export default NotFoundPage;
