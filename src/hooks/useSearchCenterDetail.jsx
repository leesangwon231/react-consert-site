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

const fetchSearchCenterDeatilsData = async (param) => {
    const { id } = param.queryKey[1] || {};  

    if (!id) {
        throw new Error('ID가 제공되지 않았습니다.');
    }

    try {
        const response = await api.get(`prfplc/${id}`, {
            params: {
                mt10id: id,  
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

export const useSearchCenterDeatils = (id) => {
    return useQuery({
        queryKey: ["center-details", { id }], 
        queryFn: fetchSearchCenterDeatilsData,
        retry: 1,
    });
};
