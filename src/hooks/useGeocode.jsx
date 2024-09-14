import { useState, useEffect } from "react";

const useGeocode = (venue) => {
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadKakaoMapSDK = () => {
      return new Promise((resolve, reject) => {
        if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
          resolve(); // SDK가 이미 로드된 경우
        } else {
          const existingScript = document.querySelector('script[src*="//dapi.kakao.com/v2/maps/sdk.js"]');
          
          if (!existingScript) {
            const script = document.createElement("script");
            script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_API_KEY}&libraries=services`;
            script.async = false;
            script.onload = () => {
              resolve();
            };
            script.onerror = () => reject(new Error("Kakao Maps SDK 로드 실패"));
            document.head.appendChild(script);
          } else {
            existingScript.onload = () => {
              resolve();
            };
            existingScript.onerror = () => reject(new Error("기존 스크립트 로드 실패"));
          }
        }
      });
    };      

    const fetchCoordinatesUsingKeywordSearch = async () => {
      try {
        await loadKakaoMapSDK(); // SDK가 로드되지 않은 경우에만 로드

        if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
          throw new Error("Kakao Maps 서비스를 사용할 수 없습니다.");
        }

        const places = new window.kakao.maps.services.Places(); // 장소 검색 객체 생성
        const query = `${venue.sidonm} ${venue.gugunnm} ${venue.fcltynm}`;

        places.keywordSearch(query, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
            const { y: lat, x: lng } = result[0]; // 첫 번째 결과의 좌표 사용
            setCoordinates({ lat, lng });
          } else {
            setError("장소를 찾을 수 없습니다.");
          }
          setLoading(false);
        });
      } catch (err) {
        setError("Geocoding 오류: " + err.message);
        setLoading(false);
      }
    };
    
    if (venue) {
      fetchCoordinatesUsingKeywordSearch();
    } 
  }, [venue]);

  return { coordinates, loading, error };
};

export default useGeocode;
