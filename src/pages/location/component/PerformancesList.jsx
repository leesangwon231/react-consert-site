import React, { useState, useEffect } from "react";
import { usePerformances } from "../../../hooks/usePerformances";
import PerformanceCard from "./PerformanceCard";
import LoadingSpinner from "../../../common/LoadingSpinner/LoadingSpinner";
import { Pagination } from 'react-bootstrap';
import { genreList } from "../../../constants/constants"; 

const PerformancesList = ({ regionCode }) => {
  const [page, setPage] = useState(1); // 현재 페이지 상태
  const [pageGroup, setPageGroup] = useState(1); // 페이지 그룹 상태 관리
  const [hasMoreData, setHasMoreData] = useState(true); // 데이터가 더 있는지 여부
  const pagesPerGroup = 8; // 한 번에 보여줄 페이지 번호 수

  const { data, error, isLoading } = usePerformances(regionCode === "all" ? null : regionCode, page); // page 추가

  // 데이터를 확인하고 더 이상 불러올 데이터가 없는지 확인
  useEffect(() => {
    if (data) {
      const performances = data?.dbs?.db || [];
      if (performances.length === 0) {
        setHasMoreData(false); // 데이터가 없으면 더 이상 가져오지 않음
      } else {
        setHasMoreData(true); // 데이터가 있으면 계속 가져옴
      }
    }
  }, [data]);

  if (isLoading) return <LoadingSpinner />; // 로딩 중일 때 스피너 표시
  
  if (error) return <p>오류 발생: {error.message}</p>;

  const performances = data?.dbs?.db || [];

  const getGenreAddress = (genrenm) => {
    const genre = genreList.find(g => g.genreName === genrenm);
    return genre ? genre.genreAddress : "unknown";
  };

  // 다음 페이지 이동 (현재 그룹 내에서)
  const handleNextPage = () => {
    setPage((prevPage) => {
      const newPage = prevPage + 1;
      if (newPage > pageGroup * pagesPerGroup) {
        setPageGroup((prevGroup) => prevGroup + 1); // 페이지 그룹을 다음 그룹으로 이동
      }
      return newPage;
    });
  };

  // 이전 페이지 이동 (현재 그룹 내에서)
  const handlePreviousPage = () => {
    setPage((prevPage) => {
      const newPage = prevPage - 1;
      if (newPage < (pageGroup - 1) * pagesPerGroup + 1) {
        setPageGroup((prevGroup) => prevGroup - 1); // 페이지 그룹을 이전 그룹으로 이동
      }
      return newPage;
    });
  };

  // 처음으로 이동
  const handleFirstPage = () => {
    setPage(1);
    setPageGroup(1);
  };

  // 마지막으로 이동 (totalCount가 없으므로 비활성화)
  const handleLastPage = () => {
    // totalCount가 없으므로 여기는 마지막 페이지로 이동할 수 없으므로 기능은 비활성화
  };

  // 현재 그룹에서 보여줄 페이지 번호 목록 계산
  const startPage = (pageGroup - 1) * pagesPerGroup + 1;
  const endPage = startPage + pagesPerGroup - 1;

  return (
    <div>
      <div className="row">
        {performances.map((performance) => {
          const category = getGenreAddress(performance.genrenm);
          return (
            <PerformanceCard key={performance.mt20id} performance={performance} category={category} />
          );
        })}
      </div>

      {/* 페이지네이션 영역 */}
      <div className="pagination-controls">
        <Pagination>
          <Pagination.First onClick={handleFirstPage} disabled={page === 1} />
          <Pagination.Prev onClick={handlePreviousPage} disabled={page === 1} />
          {/* 현재 그룹에서 보여줄 페이지 번호 */}
          {Array.from({ length: pagesPerGroup }, (_, i) => {
            const pageNum = startPage + i;
            return (
              <Pagination.Item
                key={pageNum}
                active={pageNum === page}
                onClick={() => setPage(pageNum)}
                disabled={!hasMoreData && pageNum > page}
              >
                {pageNum}
              </Pagination.Item>
            );
          })}
          <Pagination.Next onClick={handleNextPage} disabled={!hasMoreData} />
          <Pagination.Last onClick={handleLastPage} disabled />
        </Pagination>
      </div>
    </div>
  );
};

export default PerformancesList;
