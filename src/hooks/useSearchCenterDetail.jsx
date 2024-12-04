import { useQuery } from "@tanstack/react-query";
import xml2js from "xml2js";
import api from "../utils/api.jsx"; 

const parseXml = async (xml) => {
    const parser = new xml2js.Parser({ explicitArray: false });
    try {
        const result = await parser.parseStringPromise(xml);
        return result;
    } catch (err) {
        throw new Error('XML 파싱 오류: ' + err.message);
    }
};

const fetchSearchCenterDeatilsData = async ({ queryKey }) => {
    const { id } = queryKey[1] || {};

    if (!id) {
        throw new Error('ID가 제공되지 않았습니다.');
    }

    try {
        // 공연장 ID를 URL에 직접 포함하여 요청
        const response = await api.get(`prfplc/${id}`);

        const xmlData = response.data;

        // XML 응답 확인을 위해 로깅
        console.log('API 응답:', xmlData);
    
        const jsonData = await parseXml(xmlData);  // XML을 JSON으로 변환
    
        // 변환된 JSON 데이터 확인을 위해 로깅
        console.log('파싱된 데이터:', jsonData);
    
        return jsonData;

    } catch (error) {
        console.error('데이터 가져오기 오류:', error);
        throw error;
    }
};

export const useSearchCenterDeatils = (id) => {
    return useQuery({
        queryKey: ["center-details", { id }],
        queryFn: fetchSearchCenterDeatilsData,
        retry: 1,
    });
};

