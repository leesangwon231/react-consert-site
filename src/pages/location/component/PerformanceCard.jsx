import React from "react";
import { useNavigate } from "react-router-dom";
import './PerformanceCard.css';

const PerformanceCard = ({ performance, category }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/contents/${category}/${performance.mt20id}`);
  };

  return (
    <div className="col-3" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="performance-card d-flex">
        <div className="poster">
          <img
            src={performance.poster}
            alt={`${performance.prfnm} 포스터`}
            className="poster-image"
          />
        </div>
        <div className="performance-details">
          <h3>{performance.prfnm}</h3>
          <p>기간: {performance.prfpdfrom} ~ {performance.prfpdto}</p>
          <p>장소: {performance.fcltynm}</p>
          <p>장르: {performance.genrenm}</p>
          <p>상태: {performance.prfstate}</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceCard;
