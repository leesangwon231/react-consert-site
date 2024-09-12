import React from "react";
import { useVenues } from "../../../hooks/useVenues";  // 공연장 데이터를 가져오는 훅
import VenueCard from "./VenueCard";  // 공연장 카드를 추가

const VenuesList = ({ regionCode }) => {
  const { data, error, isLoading } = useVenues(regionCode);

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error.message}</p>;

  const venues = data?.dbs?.db || [];

  return (
    <div className="row">
      {venues.map((venue) => (
        <VenueCard key={venue.mt10id} venue={venue} />
      ))}
    </div>
  );
};

export default VenuesList;
