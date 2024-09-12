import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContentsDetail } from "../../hooks/useContentsDetail"; // 훅 경로 확인
import 'bootstrap/dist/css/bootstrap.min.css';

const ContentsDetailPage = () => {
  const { id } = useParams(); // URL에서 ID 가져오기
  const { data, isLoading, error } = useContentsDetail(id);

  useEffect(() => {
    if (isLoading) {
      console.log("상세 정보를 불러오는 중입니다...");
    }

    if (error) {
      console.error("상세 정보를 불러오는 중 오류 발생:", error);
    }

    if (data) {
      console.log("불러온 상세 정보:", data);
    }
  }, [data, isLoading, error]);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Contents Detail Page</h1>
      {isLoading && <p>상세 정보를 불러오는 중입니다...</p>}
      {error && <p>오류가 발생했습니다: {error.message}</p>}
      {data && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{data.prfnm}</h5>
            <p className="card-text">장소: {data.prfplc}</p>
            <p className="card-text">기간: {data.prfpdfrom} ~ {data.prfpdto}</p>
            <p className="card-text">상세 정보: {data.detail}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentsDetailPage;
