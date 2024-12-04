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


const fetchContentsDetailData = async (id) => {
    try {
        const response = await api.get(`/pblprfr/${id}`);  // 공연 ID로 세부 정보 요청
        const xmlData = response.data;
        const jsonData = await parseXml(xmlData);
        return jsonData;
    } catch (error) {
        console.error('상세 정보 가져오기 오류:', error);
        throw error;
    }
};

export const useContentsDetail = (id) => {
    return useQuery({
        queryKey: ["detail", id],
        queryFn: () => fetchContentsDetailData(id),
        retry: 1,
        enabled: !!id
    });
};
