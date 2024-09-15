import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(-1);
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{textAlign: 'center', marginTop: '50px'}}>
      <h1>
        <strong>404 - 페이지를 찾을 수 없습니다</strong>
      </h1>
      <p>
        <h4>죄송합니다, 찾으시는 페이지가 존재하지 않습니다.</h4>
      </p>

      <button onClick={() => navigate(-1)} style={{padding: '10px 20px', marginTop: '20px', borderRadius: '8px'}}>
        뒤로 가기
      </button>
      <p className="mt-4">
        <h5>5초 후에 자동으로 이전 페이지로 이동합니다...</h5>
      </p>
    </div>
  );
};

export default NotFoundPage;
