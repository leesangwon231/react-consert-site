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

const fetchCentersData = async (param) => {
    const { shprfnmfct = '', fcltychartr = '', signgucode = '', signgucodesub = '' } = param.queryKey[1] || {};

    try {
        const response = await api.get('prfplc', { 
            params: {
                shprfnmfct, 
                fcltychartr,
                signgucode,
                signgucodesub,
                cpage: '1',
                rows: '5'
            }
        });

        const xmlData = response.data;
        const jsonData = await parseXml(xmlData);
        return jsonData;

    } catch (error) {
        console.error('데이터 가져오기 오류:', error);
        throw error;
    }
};

export const useCenters = (param) => {
    return useQuery({
        queryKey: ["centers", param],
        queryFn: fetchCentersData,
        retry: 1,
    });
}
