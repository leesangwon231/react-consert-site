import React, { useState } from "react";
import { usePerformances } from "../../../hooks/usePerformances";
import PerformanceCard from "./PerformanceCard";
import { Pagination } from 'react-bootstrap';
import LoadingSpinner from "../../../common/LoadingSpinner/LoadingSpinner";
import { genreList } from "../../../constants/constants"; 

const PerformancesList = ({ regionCode }) => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = usePerformances(regionCode === "all" ? null : regionCode, page);

  // Loading 상태일 때 커스텀 스피너 표시
  if (isLoading) return <LoadingSpinner />;

  if (error) return <p>오류 발생: {error.message}</p>;

  const performances = data?.dbs?.db || [];

  const getGenreAddress = (genrenm) => {
    const genre = genreList.find(g => g.genreName === genrenm);
    return genre ? genre.genreAddress : "unknown";
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const totalPages = 10;

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

      <div className="pagination-controls">
        <Pagination>
          <Pagination.First onClick={() => setPage(1)} />
          <Pagination.Prev onClick={handlePreviousPage} disabled={page === 1} />
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === page}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={handleNextPage} disabled={page === totalPages} />
          <Pagination.Last onClick={() => setPage(totalPages)} />
        </Pagination>
      </div>
    </div>
  );
};

export default PerformancesList;
