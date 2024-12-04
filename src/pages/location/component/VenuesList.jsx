import React from "react";
import { useVenues } from "../../../hooks/useVenues";  
import VenueCard from "./VenueCard";  
import LoadingSpinner from "../../../common/LoadingSpinner/LoadingSpinner"; // 경로에 맞게 로딩 스피너 불러오기

const VenuesList = ({ regionCode }) => {
  const { data, error, isLoading } = useVenues(regionCode === "all" ? null : regionCode);

  if (isLoading) return <LoadingSpinner />; // 로딩 시 커스텀 스피너 표시
  
  if (error) return <p>오류 발생: {error.message}</p>;

  const venues = data?.dbs?.db || [];

  return (
    <div className="row">
      {venues.map((venue) => (
        <div key={venue.mt10id} className="col-3">
          <VenueCard venue={venue} selectedRegion={regionCode} />
        </div>
      ))}
    </div>
  );
};

export default VenuesList;
