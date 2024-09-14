import React, { useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom"; 
import { useSearchCenterDeatils } from "../../hooks/useSearchCenterDetail";
import { Spinner } from "react-bootstrap";
import './VenueDetailPage.css'; 

const loadKakaoMap = (latitude, longitude, address, name) => {
  const script = document.createElement("script");
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_API_KEY}&autoload=false`;
  script.async = true;

  script.onload = () => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      if (latitude && longitude) {
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
        const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
        const marker = new window.kakao.maps.Marker({ position: markerPosition });
        marker.setMap(map);
      } else {
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            const mapOptions = {
              center: coords,
              level: 3,
            };
            const map = new window.kakao.maps.Map(container, mapOptions);
            const marker = new window.kakao.maps.Marker({ position: coords });
            marker.setMap(map);
          }
        });
      }
    });
  };
  document.head.appendChild(script);
};

const VenueDetailPage = () => {
  const { id } = useParams();
  const { state } = useLocation();  // 이전 페이지에서 전달된 상태 받기
  const navigate = useNavigate();
  const { data, error, isLoading } = useSearchCenterDeatils(id);

  useEffect(() => {

    const venueDetails = data?.dbs?.db;

    if (venueDetails) {
      if (venueDetails.la && venueDetails.lo) {
        loadKakaoMap(venueDetails.la, venueDetails.lo, venueDetails.adres, venueDetails.fcltynm);
      } else if (venueDetails.adres) {
        loadKakaoMap(null, null, venueDetails.adres, venueDetails.fcltynm);
      }
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    console.error(`오류 발생: ${error.message}`);
    return <p>오류 발생; {error.message}</p>;
  }

  const venueDetails = data?.dbs?.db || {};

  return (
    <div className="venue-detail-container">
      <h2 className="venue-name">{venueDetails.fcltynm || "정보 없음"}</h2>
      <p className="venue-address">{venueDetails.adres || "정보 없음"}</p>
      <p><strong>전화번호:</strong> {venueDetails.telno || "정보 없음"}</p>
      <p><strong>좌석 수:</strong> {venueDetails.seatscale || "정보 없음"}</p>
      
      <p><strong>관련 URL:</strong> <a href={venueDetails.relateurl} target="_blank" rel="noopener noreferrer">{venueDetails.relateurl || "정보 없음"}</a></p>

      <div className="venue-icons">
        <div className="icon-box">
          <p>식당: {venueDetails.restaurant === 'Y' ? '있음' : '없음'}</p>
        </div>
        <div className="icon-box">
          <p>카페: {venueDetails.cafe === 'Y' ? '있음' : '없음'}</p>
        </div>
        <div className="icon-box">
          <p>상점: {venueDetails.store === 'Y' ? '있음' : '없음'}</p>
        </div>
      </div>

      <div id="map" className="venue-map"></div>

      {/* 하위 공연장 정보 */}
      {Array.isArray(venueDetails.mt13s?.mt13) ? (
        <div className="sub-venues">
          <h3>하위 공연장 목록</h3>
          {venueDetails.mt13s.mt13.map((subVenue) => (
            <div key={subVenue.mt13id} className="sub-venue">
              <h4>{subVenue.prfplcnm || "정보 없음"}</h4>
              <p>좌석 수: {subVenue.seatscale || "정보 없음"}</p>
              <p>무대 연습 가능 여부: {subVenue.stagepracat === 'Y' ? '가능' : '불가능'}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>하위 공연장 정보가 없습니다.</p>
      )}
    </div>
  );
};

export default VenueDetailPage;
