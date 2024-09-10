import React from "react";

const PerformanceCard = ({ performance }) => {
    return (
        <div className="performance-card">
            <img src={performance.poster} alt={performance.prfnm} />
            <h3>{performance.prfnm}</h3>
            <p>장소: {performance.fcltynm}</p>
            <p>공연 시작일: {performance.prfpdfrom}</p>
            <p>공연 종료일: {performance.prfpdto}</p>
        </div>
    );
};

export default PerformanceCard;
