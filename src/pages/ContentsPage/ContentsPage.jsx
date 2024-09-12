import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";  // useNavigate 추가
import { useContents } from "../../hooks/useContents";
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
    const navigate = useNavigate();  // navigate 훅 사용

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

    const handleCardClick = (id) => {
        navigate(`/contents/${id}`); // 경로를 /contents/:id로 수정
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Contents Page</h1>
            {isLoading && <p>데이터를 불러오는 중입니다...</p>}
            {error && <p>오류가 발생했습니다: {error.message}</p>}
            {data?.dbs?.db && (
                <div className="row">
                    {data.dbs.db.map((item, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="card mb-4" onClick={() => handleCardClick(item.mt20id)}> {/* 카드 클릭 핸들러 */}
                                <div className="card-body">
                                    <h5 className="card-title">{item.prfnm}</h5>
                                    <p className="card-text">장소: {item.prfplc}</p>
                                    <p className="card-text">기간: {item.prfpdfrom} ~ {item.prfpdto}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContentsPage;
