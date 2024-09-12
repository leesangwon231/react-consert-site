import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import xml2js from "xml2js";
import { useState } from "react";

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
  const [_, regionCode, page] = queryKey; // page를 queryKey에 추가

  console.log(`Fetching data for regionCode: ${regionCode}, page: ${page}`);

  const response = await api.get('pblprfr', {
    params: {
      service: import.meta.env.VITE_API_KEY, // 인증키 동적으로 전달
      stdate: '20240101', // 공연 시작일
      eddate: '20241231', // 공연 종료일
      cpage: page, // 페이지 번호
      signgucode: regionCode, // 대분류 지역 코드만
      rows: 20, // 페이지당 최대 20개 공연
    }
  });

  const xmlData = response.data;
  const jsonData = await parseXml(xmlData);

  console.log(jsonData); // 데이터 확인용

  return jsonData;
};

// React Query를 이용한 데이터 호출
export const usePerformances = (regionCode, page) => {
  return useQuery({
    queryKey: ["performances", regionCode, page], // page를 포함한 queryKey
    queryFn: fetchPerformancesData,
    enabled: !!regionCode, // 조건이 충족될 때만 쿼리 실행
    retry: 1,
    keepPreviousData: true, // 페이지 이동 시 기존 데이터를 유지
  });
};
