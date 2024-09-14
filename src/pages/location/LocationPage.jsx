import 'bootstrap/dist/css/bootstrap.min.css';
import './Location.style.css';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PerformancesList from "./component/PerformancesList";
import VenuesList from "./component/VenuesList";  // 공연장 리스트 컴포넌트 추가
import queryString from 'query-string'; // URL 쿼리 파라미터를 파싱하기 위한 라이브러리

const regions = [

  { code: "all", name: "전체" },  // "전체" 항목 추가
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
  const navigate = useNavigate();
  const location = useLocation();
  const parsedQuery = queryString.parse(location.search); // URL에서 쿼리 파라미터 읽기

  // URL 쿼리에서 viewMode와 region 읽기, 없을 경우 기본값으로 설정
  const [selectedRegion, setSelectedRegion] = useState(parsedQuery.region || "all");
  const [viewMode, setViewMode] = useState(parsedQuery.viewMode || "performances");

  // 초기 로드 시 "전체" 데이터를 가져오도록 설정
  useEffect(() => {
    if (!parsedQuery.region || !parsedQuery.viewMode) {
      navigate(`/location?region=all&viewMode=performances`);
    }
  }, [navigate, parsedQuery.region, parsedQuery.viewMode]);

  const handleRegionClick = (regionCode) => {
    setSelectedRegion(regionCode);
    navigate(`/location?region=${regionCode}&viewMode=${viewMode}`); // URL에 지역 코드 추가
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);  // 공연/공연장 모드 전환
    setSelectedRegion("all"); // 모드가 바뀔 때마다 지역을 "전체"로 설정
    navigate(`/location?region=all&viewMode=${mode}`); // URL에 viewMode와 region 반영
  };

  return (
    <div className="location-page global-mx">
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
