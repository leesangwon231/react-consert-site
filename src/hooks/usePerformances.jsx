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

// 공연 데이터를 가져오는 함수
const fetchPerformancesData = async ({ queryKey }) => {
  const [_, regionCode, page] = queryKey;

  console.log(`Fetching data for regionCode: ${regionCode}, page: ${page}`);

  // API 요청 파라미터 구성
  const params = {
    service: import.meta.env.VITE_API_KEY, // 인증키 동적으로 전달
    stdate: '20240101', // 공연 시작일
    eddate: '20241231', // 공연 종료일
    cpage: page, // 페이지 번호
    rows: 20, // 페이지당 최대 20개 공연
  };

  // "all"이 아닌 경우에만 signgucode 파라미터 추가
  if (regionCode && regionCode !== "all") {
    params.signgucode = regionCode; // 대분류 지역 코드만
  }

  const response = await api.get('pblprfr', { params });

  const xmlData = response.data;
  const jsonData = await parseXml(xmlData);

  console.log(jsonData); // 데이터 확인용

  return jsonData;
};

// React Query를 이용한 데이터 호출
export const usePerformances = (regionCode, page) => {
  return useQuery({
    queryKey: ["performances", regionCode || "all", page],
    queryFn: fetchPerformancesData,
    retry: 1,
    keepPreviousData: true,
  });
};
