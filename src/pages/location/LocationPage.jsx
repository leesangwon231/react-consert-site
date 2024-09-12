import 'bootstrap/dist/css/bootstrap.min.css';
import './Location.style.css';
import { useState, useEffect } from 'react';
import PerformancesList from "./component/PerformancesList";
import VenuesList from "./component/VenuesList";  // 공연장 리스트 컴포넌트 추가

const regions = [
  { code: "11", name: "서울" },
  { code: "26", name: "부산" },
  { code: "27", name: "대구" },
  { code: "28", name: "인천" },
  { code: "29", name: "광주" },
  { code: "30", name: "대전" },
  { code: "31", name: "울산" },
  { code: "36", name: "세종" },
  { code: "41", name: "경기" },
  { code: "51", name: "강원" },
  { code: "43", name: "충북" },
  { code: "44", name: "충남" },
  { code: "45", name: "전북" },
  { code: "46", name: "전남" },
  { code: "47", name: "경북" },
  { code: "48", name: "경남" },
  { code: "50", name: "제주" }
];

const LocationPage = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);  // 선택한 지역
  const [viewMode, setViewMode] = useState("performances");    // "공연" 또는 "공연장"을 선택하는 스위치 상태

  useEffect(() => {
    console.log(`클릭된 대분류 지역 코드: ${selectedRegion}`);
  }, [selectedRegion]);

  const handleRegionClick = (regionCode) => {
    setSelectedRegion(regionCode);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);   // 공연/공연장 모드 전환
  };

  return (
    <div className="location-page">
      <h1>지역별 공연 정보</h1>
      
      {/* 스위치 버튼 */}
      <div className="view-mode-switch">
        <button 
          className={`switch-btn ${viewMode === "performances" ? 'active' : ''}`}
          onClick={() => handleViewModeChange("performances")}
        >
          공연
        </button>
        <button 
          className={`switch-btn ${viewMode === "venues" ? 'active' : ''}`}
          onClick={() => handleViewModeChange("venues")}
        >
          공연장
        </button>
      </div>

      {/* 지역 선택 버튼 */}
      <div className="region-list">
        {regions.map((region) => (
          <div
            key={region.code}
            className={`region-item ${region.code === selectedRegion ? 'active' : ''}`}
            onClick={() => handleRegionClick(region.code)}
          >
            <span>{region.name}</span>
          </div>
        ))}
      </div>

      {/* 공연 또는 공연장 목록 출력 */}
      {selectedRegion && (
        <>
          {viewMode === "performances" ? (
            <PerformancesList regionCode={selectedRegion} />
          ) : (
            <VenuesList regionCode={selectedRegion} />
          )}
        </>
      )}
    </div>
  );
};

export default LocationPage;
