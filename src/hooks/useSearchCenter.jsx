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

const fetchAllSearchCentersData = async ({ queryKey }) => {
    const { shprfnmfct = '', page = 1 } = queryKey[1] || {};
    let allResults = [];

    try {
        const response = await api.get('prfplc', { 
            params: {
                shprfnmfct,
                cpage: page.toString(),  // Fixed: Use 'page' instead of 'currentPage'
                rows: '500'
            }
        });

        const xmlData = response.data;
        const jsonData = await parseXml(xmlData);

        if (jsonData.dbs && jsonData.dbs.db) {
            const currentResults = jsonData.dbs.db;

            if (Array.isArray(currentResults)) {
                allResults = [...allResults, ...currentResults];
            }
        }

        return { dbs: { db: allResults } };

    } catch (error) {
        console.error('데이터 가져오기 오류:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const useSearchCenters = (param) => {
    return useQuery({
        queryKey: ["centers", param],
        queryFn: fetchAllSearchCentersData,
        retry: 1,
    });
};
