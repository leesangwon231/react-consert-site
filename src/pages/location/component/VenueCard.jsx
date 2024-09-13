import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import useGeocode from "../../../hooks/useGeocode";  // 좌표 변환 훅
import { Spinner } from 'react-bootstrap'; // Bootstrap Spinner 추가
import './VenueCard.style.css'; // CSS 파일 연결

const VenueCard = ({ venue }) => {
  const { coordinates, loading, error } = useGeocode(venue);  // 좌표 변환

  return (
    <div className="venue-card">
      <h3>{venue.fcltynm}</h3>
      <p>지역: {venue.sidonm} {venue.gugunnm}</p>
      <p>시설 특성: {venue.fcltychartr}</p>
      <p>개관년도: {venue.opende}</p>

      {/* 지도 추가 */}
      <div className="venue-map">
        {loading ? (
          <div className="loading-spinner">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : error || (!coordinates.lat && !coordinates.lng) ? (
          <div className="venue-map-placeholder"></div>
        ) : (
          <MapContainer 
            center={[coordinates.lat, coordinates.lng]} 
            zoom={13} 
            style={{ height: "200px", width: "100%" }}
            attributionControl={false}  // 저작권 표시 제거
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
  );
};

export default VenueCard;
