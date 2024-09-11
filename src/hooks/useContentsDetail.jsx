import {useQuery} from "@tanstack/react-query";
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

const fetchContentsDetailData =  async (param) => {
    try {
        const response = await api.get(`pblprfr/${param.queryKey[1]}`, {
        });

        const xmlData = response.data;

        const jsonData = await parseXml(xmlData);

        return jsonData;

    } catch (error) {
        console.error('데이터 가져오기 오류:', error);
        throw error;
    }
};

export const useContentsDetail = (contentId) => {
    return useQuery({
        queryKey : ["contents-details-all",contentId],
        queryFn :fetchContentsDetailData,
        retry : 1,
        enabled : !!contentId,
        staleTime : 600000
    });
}