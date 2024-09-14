import React, { useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom"; 
import { useSearchCenterDeatils } from "../../hooks/useSearchCenterDetail";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner"; // 경로에 맞게 로딩 스피너 불러오기
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
  const { state } = useLocation();  
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
    return <LoadingSpinner />; // 로딩 시 커스텀 스피너 표시
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
      <hr className="divider-line" />

      <div className="venue-details">
          <p><strong>전화번호 : </strong> {venueDetails.telno || "정보 없음"}</p>
          <p><strong>좌석 수 : </strong> {venueDetails.seatscale || "정보 없음"}</p>
          <p className="inline-url">
            <strong>관련 URL : </strong> <a href="https://www.instagram.com/play_block13/" target="_blank" rel="noopener noreferrer">https://www.instagram.com/play_block13/</a>
          </p>
      </div>
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

      {Array.isArray(venueDetails.mt13s?.mt13) ? (
        <div className="sub-venues">
          <h3>하위 공연장 목록</h3>
          <div className="sub-venues-list">
            {venueDetails.mt13s.mt13.map((subVenue) => (
              <div key={subVenue.mt13id} className="sub-venue-card">
                <h4>{subVenue.prfplcnm || `${subVenue.mt13id}관`}</h4>
                <p>좌석 수: {subVenue.seatscale || "정보 없음"}</p>
                <p>무대 연습 가능 여부: {subVenue.stagepracat === 'Y' ? '가능' : '불가능'}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="sub-venues">
          <h3>하위 공연장 정보가 없습니다.</h3>
        </div>
      )}
    </div>
  );
};

export default VenueDetailPage;
