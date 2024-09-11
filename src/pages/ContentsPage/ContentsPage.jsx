import React, { useEffect } from "react";
import { useContents } from "../../hooks/useContents"; // 수정된 훅 경로에 맞춰 변경
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ContentsPage.css";

const ContentsPage = () => {
    
    const param = {
        shcate: '',      
        signgucode: '',   
        prfstate: '',     
        shprfnm: '',      
        row:'',
    };
 
    const { data, isLoading, error } = useContents(param);

    
    useEffect(() => {
        if (isLoading) {
            console.log("데이터를 불러오는 중입니다...");
        }

        if (error) {
            console.error("데이터를 불러오는 중 오류 발생:", error);
        }

        if (data) {
            console.log("불러온 데이터:", data); 
        }
    }, [data, isLoading, error]);

    return (
        <div>
            <h1>Contents Page</h1>
        </div>
    );
};

export default ContentsPage;
