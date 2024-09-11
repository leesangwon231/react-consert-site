import 'bootstrap/dist/css/bootstrap.min.css';
import './Location.style.css';
import { useState, useEffect } from 'react';
import PerformancesList from "./component/PerformancesList";

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
  { code: "43", name: "충청" },
  { code: "44", name: "충청" },
  { code: "45", name: "전북" },
  { code: "46", name: "전남" },
  { code: "47", name: "경북" },
  { code: "48", name: "경남" },
  { code: "50", name: "제주" }
];

const LocationPage = () => {
  const [selectedRegion, setSelectedRegion] = useState(null); // 대분류 선택 상태

  useEffect(() => {
    console.log(`클릭된 대분류 지역 코드: ${selectedRegion}`);
  }, [selectedRegion]);

  const handleRegionClick = (regionCode) => {
    setSelectedRegion(regionCode);
  };

  return (
    <div className="location-page">
      <h1>지역별 공연 정보</h1>
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
      {selectedRegion && (
        <>
          <PerformancesList regionCode={selectedRegion} />
        </>
      )}
    </div>
  );
};

export default LocationPage;
