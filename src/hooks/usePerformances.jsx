// usePerformances.jsx

import { useQuery } from "@tanstack/react-query";
import Api from "../utils/api";
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
    const [_, regionCode] = queryKey; // regionCode는 사용자가 선택한 지역 코드
    const response = await Api.get('', {
        params: {
            stdate: '20240101',
            eddate: '20240909',
            signgucode: regionCode, // 지역 코드
        }
    });
    
    const xmlData = response.data;
    const jsonData = await parseXml(xmlData);
    
    return jsonData;
};

// React Query를 이용한 데이터 호출
export const usePerformances = (regionCode) => {
    return useQuery({
        queryKey: ["performances", regionCode],
        queryFn: fetchPerformancesData,
        retry: 1,
    });
};
