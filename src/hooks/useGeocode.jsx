import { useState, useEffect } from "react";

const useGeocode = (venue) => {
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadKakaoMapSDK = () => {
      return new Promise((resolve, reject) => {
        if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
          console.log("Kakao Maps SDK가 이미 로드되었습니다.");
          resolve(); // SDK가 이미 로드된 경우
        } else {
          const existingScript = document.querySelector('script[src*="//dapi.kakao.com/v2/maps/sdk.js"]');
          
          if (!existingScript) {
            const script = document.createElement("script");
            script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_API_KEY}&libraries=services`;
            script.async = false;
            script.onload = () => {
              console.log("SDK 로드 완료");
              resolve();
            };
            script.onerror = () => reject(new Error("Kakao Maps SDK 로드 실패"));
            document.head.appendChild(script);
          } else {
            existingScript.onload = () => {
              console.log("기존 스크립트 로드 완료");
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
        console.log("키워드 검색:", query);

        places.keywordSearch(query, (result, status) => {
          console.log("검색 결과 상태:", status);
          console.log("검색 결과:", result);
          if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
            const { y: lat, x: lng } = result[0]; // 첫 번째 결과의 좌표 사용
            console.log("좌표를 찾았습니다:", { lat, lng });
            setCoordinates({ lat, lng });
          } else {
            console.log("장소를 찾을 수 없습니다.");
            setError("장소를 찾을 수 없습니다.");
          }
          setLoading(false);
        });
      } catch (err) {
        console.log("Geocoding 오류:", err);
        setError("Geocoding 오류: " + err.message);
        setLoading(false);
      }
    };
    
    if (venue) {
      console.log("Venue 정보가 제공되었습니다. 좌표를 검색합니다.");
      fetchCoordinatesUsingKeywordSearch();
    } else {
      console.log("Venue 정보가 제공되지 않았습니다.");
    }
  }, [venue]);

  return { coordinates, loading, error };
};

export default useGeocode;
