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

const fetchContentsData =  async (param) => {

    try {
        const response = await api.get('', {
            params: {
                shcate : param.queryKey[1].shcate,
                signgucode : param.queryKey[1].signgucode,
                prfstate : param.queryKey[1].prfstate,
                shprfnm : param.queryKey[1].shprfnm,
                stdate: '20240601',
                eddate: '20241231',
                cpage: '1',
                rows: '12'
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

export const useContents = (param) => {
    return useQuery({
        queryKey : ["contents",param],
        queryFn :fetchContentsData,
        retry : 1,
    });
}