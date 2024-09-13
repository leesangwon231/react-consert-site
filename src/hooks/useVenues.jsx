import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import xml2js from "xml2js";

// XML을 JSON으로 변환하는 함수
const parseXml = async (xml) => {
  const parser = new xml2js.Parser({ explicitArray: false });
  try {
    const result = await parser.parseStringPromise(xml);
    return result;
  } catch (err) {
    throw new Error('XML 파싱 오류: ' + err.message);
  }
};

// 공연장 데이터를 가져오는 함수
const fetchVenuesData = async ({ queryKey }) => {
  const [_, regionCode] = queryKey;

  const response = await api.get('prfplc', {
    params: {
      service: import.meta.env.VITE_API_KEY, // 인증키
      cpage: 1,  // 페이지 번호
      rows: 20,  // 페이지당 20개
      signgucode: regionCode,  // 지역 코드
    }
  });

  const xmlData = response.data;
  const jsonData = await parseXml(xmlData);

  console.log(jsonData); // 데이터 확인

  return jsonData;
};

// React Query를 이용한 데이터 호출
export const useVenues = (regionCode) => {
  return useQuery({
    queryKey: ["venues", regionCode],
    queryFn: fetchVenuesData,
    enabled: !!regionCode,  // 조건이 충족될 때만 쿼리 실행
    retry: 1,
  });
};
