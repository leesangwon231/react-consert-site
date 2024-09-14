import React from "react";
import { useVenues } from "../../../hooks/useVenues";  
import VenueCard from "./VenueCard";  
import { Spinner } from 'react-bootstrap'; 

const VenuesList = ({ regionCode }) => {
  const { data, error, isLoading } = useVenues(regionCode === "all" ? null : regionCode);

  if (isLoading) return (
    <div className="loading-spinner">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
  
  if (error) return <p>오류 발생: {error.message}</p>;

  const venues = data?.dbs?.db || [];

  return (
    <div className="row">
      {venues.map((venue) => (
        <div key={venue.mt10id} className="col-3">
          <VenueCard venue={venue} selectedRegion={regionCode} /> {/* 지역 코드 전달 */}
        </div>
      ))}
    </div>
  );
};

export default VenuesList;
