import { useState, useEffect } from "react";
import axios from "axios";

// Kakao Geocoding API를 사용해 주소를 위도와 경도로 변환하는 훅
const useGeocode = (venue) => {
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        // 지역명과 시설명을 조합한 검색 키워드
        const query = `${venue.sidonm} ${venue.gugunnm} ${venue.fcltynm}`;
        console.log("검색 키워드:", query);
        
        const response = await axios.get("https://dapi.kakao.com/v2/local/search/keyword.json", {
          params: { query }, // 키워드 검색
          headers: {
            Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_API_KEY}`, // API 키
          },
        });

        console.log("Kakao API 응답:", response);

        if (response.data.documents.length > 0) {
          const { y: lat, x: lng } = response.data.documents[0]; // 첫 번째 검색 결과의 좌표 사용
          setCoordinates({ lat, lng });
        } else {
          setError("주소를 찾을 수 없습니다.");
        }
      } catch (err) {
        setError("Geocoding 오류: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (venue) {
      fetchCoordinates();
    }
  }, [venue]);

  return { coordinates, loading, error };
};

export default useGeocode;
