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

const fetchAllSearchCentersData = async ({ queryKey }) => {
    const { shprfnmfct = '', currentPage = 1 } = queryKey[1] || {};
    try {
        const response = await api.get('prfplc', { 
            params: {
                shprfnmfct,
                cpage: currentPage.toString(), 
                rows: '1000' 
            }
        });

        const xmlData = response.data;
        const jsonData = await parseXml(xmlData);

        if (jsonData.dbs && jsonData.dbs.db) {
            const currentResults = jsonData.dbs.db;
            return { dbs: { db: Array.isArray(currentResults) ? currentResults : [] } };
        } else {
            return { dbs: { db: [] } };
        }        
    } catch (error) {
        console.error('데이터 가져오기 오류:', error);
        throw new Error('데이터 가져오기 오류: ' + error.message);
    }
};

export const useSearchCenters = (param) => {
    return useQuery({
        queryKey: ["centers", param],
        queryFn: fetchAllSearchCentersData,
        retry: 1,
        select: (data) => {
            return Array.isArray(data?.dbs?.db) ? data : { dbs: { db: [] } };
        }
    });
};
