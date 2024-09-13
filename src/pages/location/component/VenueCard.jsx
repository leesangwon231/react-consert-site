import React from "react";
import './VenueCard.style.css'; // CSS 파일 연결

const VenueCard = ({ venue }) => {
  return (
    <div className="venue-card">
      <h3>{venue.fcltynm}</h3>
      <p>지역: {venue.sidonm} {venue.gugunnm}</p>
      <p>시설 특성: {venue.fcltychartr}</p>
      <p>개관년도: {venue.opende}</p>
    </div>
  );
};

export default VenueCard;
