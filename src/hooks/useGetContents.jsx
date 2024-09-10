import {useQuery} from "@tanstack/react-query";
import xml2js from "xml2js";
import api from "../utils/api.jsx";
const API_KEY = import.meta.env.VITE_API_KEY;


const parseXml = async (xml) => {
    const parser = new xml2js.Parser({ explicitArray: false });
    try {
        const result = await parser.parseStringPromise(xml);
        return result;
    } catch (err) {
        throw new Error('XML 파싱 오류: ' + err.message);
    }
};

const fetchContentsData =  async ({mt20id}) => {

    try {
        const response = await api.get(`/contents/${mt20id}`, {
            params: {
                service: API_KEY,
            }
        });

        const xmlData = response.data;

        const jsonData = await parseXml(xmlData);

        console.log('자바스크립트 객체:', jsonData);
        return jsonData;

    } catch (error) {
        console.error('데이터 가져오기 오류:', error);
        throw error;
    }
};

export const useContents = ({mt20id}) => {
    return useQuery({
        queryKey : ["contents-detail", mt20id],
        queryFn :()=>fetchContentsData({mt20id}),
        retry : 1,
    });
}