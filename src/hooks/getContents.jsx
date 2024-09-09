import {useQuery} from "@tanstack/react-query";
import api from "../utils/api.jsx";
import xml2js from "xml2js";


const fetchContentsData = async () => {
    const response = await api.get('', {
        params: {
            stdate: '20160601',
            eddate: '20160630',
            cpage: '1',
            rows: '5',
            prfstate: '02',
            signgucode: '11',
            signgucodesub: '1111',
            kidstate: 'Y',
        },
    });

    return response;
};

export const useContents = () => {
    return useQuery({
        queryKey : ["contents"],
        queryFn :fetchContentsData,
    });
}