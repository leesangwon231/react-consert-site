import React from "react";
import { useNavigate } from "react-router-dom";
import './PerformanceCard.css'; // CSS 파일 연결

const PerformanceCard = ({ performance }) => {
  const navigate = useNavigate(); // 상세 페이지로 이동할 수 있게 하는 React Router 훅

  const handleClick = () => {
    navigate(`/contents/${performance.mt20id}`); // 공연 ID를 경로에 포함해 이동
  };

  return (
    <div className="col-3" onClick={handleClick} style={{ cursor: 'pointer' }}> {/* 카드 클릭하면 상세페이지 이동 */}
      <div className="performance-card d-flex"> {/* Flexbox의 레이아웃, 좌우 배치 */}
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
