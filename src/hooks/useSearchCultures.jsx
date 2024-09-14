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

const fetchSearchContentsData = async (param) => {
    const { shprfnm = '' } = param.queryKey[1] || {};
    let allResults = [];
    let cpage = 1;
    let hasMoreData = true;

    try {
        while (hasMoreData) {
            const response = await api.get('pblprfr', {
                params: {
                    shprfnm,
                    stdate: '20240101',
                    eddate: '20241231',
                    cpage: cpage.toString(),
                    rows: '5'
                }
            });

            const xmlData = response.data;
            const jsonData = await parseXml(xmlData);

            if (jsonData.dbs && jsonData.dbs.db) {
                const currentResults = jsonData.dbs.db;
                if (Array.isArray(currentResults) && currentResults.length > 0) {
                    allResults = [...allResults, ...currentResults];
                } else {
                    hasMoreData = false;
                }
            } else {
                hasMoreData = false;
            }

            cpage++;
        }

        return { dbs: { db: allResults } };

    } catch (error) {
        console.error('데이터 가져오기 오류:', error);
        throw error;
    }
};

export const useSearchCultures = (param) => {
    return useQuery({
        queryKey: ["cultures", param],
        queryFn: fetchSearchContentsData,
        retry: 1,
    });
}
