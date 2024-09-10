// PerformancesList.jsx
import React from "react";
import { usePerformances } from "../../../hooks/usePerformances";
import PerformanceCard from "./PerformanceCard";

const PerformancesList = ({ regionCode }) => {
    const { data, error, isLoading } = usePerformances(regionCode);

    if (isLoading) return <p>로딩 중...</p>;
    if (error) return <p>오류 발생: {error.message}</p>;

    const performances = data?.dbs?.db || [];

    return (
        <div className="performances-list">
            {performances.length > 0 ? (
                performances.map((performance) => (
                    <PerformanceCard key={performance.mt20id} performance={performance} />
                ))
            ) : (
                <p>해당 지역에 공연이 없습니다.</p>
            )}
        </div>
    );
};

export default PerformancesList;
