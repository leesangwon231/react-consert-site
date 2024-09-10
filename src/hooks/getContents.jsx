import {useQuery} from "@tanstack/react-query";
import xml2js from "xml2js";
import Api from "../utils/api.jsx";

const fetchContentsData =  async () => {


    try{

        const response = await Api.get('', {
            params: {
                stdate: '20160601',
                eddate: '20160630',
                cpage: '1',
                rows: '5'
            },
            Accept: 'application/xml'
        });

        const xmlData = await response.data;


        console.log(" Data:", xmlData);

        return xmlData;

    }catch (error) {
        console.error("Error parsing XML:", error);
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