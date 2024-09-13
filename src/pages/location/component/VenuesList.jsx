import React from "react";
import { useVenues } from "../../../hooks/useVenues";  // 공연장 데이터를 가져오는 훅
import VenueCard from "./VenueCard";  // 공연장 카드를 추가
import { Spinner } from 'react-bootstrap'; // Spinner 컴포넌트 임포트

const VenuesList = ({ regionCode }) => {
  const { data, error, isLoading } = useVenues(regionCode);

  if (isLoading) return (
    <div className="loading-spinner">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  ); // 로딩 중일 때 스피너 표시
  
  if (error) return <p>오류 발생: {error.message}</p>;

  const venues = data?.dbs?.db || [];

  return (
    <div className="row"> {/* 여기는 col-3가 들어가지 않음 */}
      {venues.map((venue) => (
        <div className="col-3"> {/* 여기만 col-3을 적용 */}
          <VenueCard key={venue.mt10id} venue={venue} />
        </div>
      ))}
    </div>
  );
};

export default VenuesList;
