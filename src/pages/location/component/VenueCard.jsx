import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import useGeocode from "../../../hooks/useGeocode";  // 좌표 변환 훅
import './VenueCard.style.css'; // CSS 파일 연결

const VenueCard = ({ venue }) => {
  const address = `${venue.sidonm} ${venue.gugunnm} ${venue.fcltynm}`;  // 공연장 주소
  const { coordinates, loading, error } = useGeocode(address);  // 좌표 변환

  return (
    <div className="col-3">
      <div className="venue-card">
        <h3>{venue.fcltynm}</h3>
        <p>지역: {venue.sidonm} {venue.gugunnm}</p>
        <p>시설 특성: {venue.fcltychartr}</p>
        <p>개관년도: {venue.opende}</p>

        {/* 지도 추가 */}
        <div className="venue-map">
          {loading ? (
            <p>지도 로딩 중...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <MapContainer center={[coordinates.lat, coordinates.lng]} zoom={13} style={{ height: "200px", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[coordinates.lat, coordinates.lng]}>
                <Popup>
                  {venue.fcltynm} 위치
                </Popup>
              </Marker>
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default VenueCard;
