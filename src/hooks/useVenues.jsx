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

  // API 요청 파라미터 설정
  const params = {
    service: import.meta.env.VITE_API_KEY, // 인증키
    cpage: 1,  // 페이지 번호
    rows: 20,  // 페이지당 20개
  };

  // "전체"가 아닌 경우에만 signgucode 파라미터를 추가
  if (regionCode && regionCode !== "all") {
    params.signgucode = regionCode;
  }

  const response = await api.get('prfplc', { params });

  const xmlData = response.data;
  const jsonData = await parseXml(xmlData);

  console.log(jsonData); // 데이터 확인

  return jsonData;
};

// React Query를 이용한 데이터 호출
export const useVenues = (regionCode) => {
  return useQuery({
    queryKey: ["venues", regionCode || "all"], // regionCode가 없을 경우 "all"로 설정
    queryFn: fetchVenuesData,
    retry: 1,
    keepPreviousData: true, // 페이지 이동 시 이전 데이터 유지
  });
};
