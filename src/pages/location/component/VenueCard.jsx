import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 사용
import './VenueCard.style.css'; // CSS 파일 연결

const VenueCard = ({ venue }) => {
  const navigate = useNavigate(); // React Router의 useNavigate 훅 사용

  const handleClick = () => {
    navigate(`/hall/${venue.mt10id}`); // 공연장 상세페이지로 이동
  };

  return (
    <div className="venue-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <h3>{venue.fcltynm}</h3>
      <p>지역: {venue.sidonm} {venue.gugunnm}</p>
      <p>시설 특성: {venue.fcltychartr}</p>
      <p>개관년도: {venue.opende}</p>
    </div>
  );
};

export default VenueCard;
