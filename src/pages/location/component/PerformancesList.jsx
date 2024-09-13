import React, { useState } from "react";
import { usePerformances } from "../../../hooks/usePerformances";
import PerformanceCard from "./PerformanceCard";
import { Spinner } from 'react-bootstrap'; // Spinner 컴포넌트 임포트

const PerformancesList = ({ regionCode }) => {
  const [page, setPage] = useState(1); // 현재 페이지 번호 상태 관리
  const { data, error, isLoading } = usePerformances(regionCode, page); // 페이지 번호 전달

  if (isLoading) return (
    <div className="loading-spinner">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  ); // 로딩 중일 때 스피너 표시

  if (error) return <p>오류 발생: {error.message}</p>;

  const performances = data?.dbs?.db || [];

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1); // 다음 페이지로 이동
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1); // 이전 페이지로 이동
    }
  };

  return (
    <div>
      <div className="row"> {/* 행(row)로 감싸서 한 줄에 4개씩 나오게 설정 */}
        {performances.map((performance) => (
          <PerformanceCard key={performance.mt20id} performance={performance} />
        ))}
      </div>

      {/* 페이지네이션 버튼 */}
      <div className="pagination-controls">
        <button disabled={page === 1} onClick={handlePreviousPage} className="pagination-button">
          이전 페이지
        </button>
        <span className="pagination-info">현재 페이지: {page}</span>
        <button onClick={handleNextPage} className="pagination-button">다음 페이지</button>
      </div>
    </div>
  );
};

export default PerformancesList;
