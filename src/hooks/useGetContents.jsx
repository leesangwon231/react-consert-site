import {useQuery} from "@tanstack/react-query";
import xml2js from "xml2js";
import Api from "../utils/api.jsx";


const parseXml = async (xml) => {
    const parser = new xml2js.Parser({ explicitArray: false });
    try {
        const result = await parser.parseStringPromise(xml);
        return result;
    } catch (err) {
        throw new Error('XML 파싱 오류: ' + err.message);
    }
};

const fetchContentsData =  async () => {

    try {
        const response = await Api.get('', {
            params: {
                stdate: '20160601',
                eddate: '20160630',
                cpage: '1',
                rows: '5'
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

export const useContents = () => {
    return useQuery({
        queryKey : ["contents"],
        queryFn :fetchContentsData,
        retry : 1,
    });
}