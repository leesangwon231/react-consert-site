import { useQuery } from "@tanstack/react-query";
import xml2js from "xml2js";
import api from "../utils/api.jsx";

const parseXml = async (xml) => {
    const parser = new xml2js.Parser({ explicitArray: false });
    try {
        return await parser.parseStringPromise(xml);
    } catch (err) {
        throw new Error('XML 파싱 오류: ' + err.message);
    }
};

const fetchSearchContentsData = async ({ queryKey }) => {
    const { shprfnm = '' } = queryKey[1] || {};

    try {
        // Fetch the data
        const response = await api.get('pblprfr', {
            params: {
                shprfnm,
                stdate: '20240101',
                eddate: '20241231',
                cpage: '1',
                rows: '1000'
            }
        });

        // Parse the XML response
        const jsonData = await parseXml(response.data);

        // Merge the results
        const mergedResults = jsonData.dbs?.db ?? [];

        return { dbs: { db: mergedResults } };
    } catch (error) {
        console.error('데이터 가져오기 오류:', error);
        throw new Error('데이터 가져오기 오류: ' + error.message);
    }
};

export const useSearchCultures = (param) => {
    return useQuery({
        queryKey: ["cultures", param],
        queryFn: fetchSearchContentsData,
        retry: 1,
    });
};
