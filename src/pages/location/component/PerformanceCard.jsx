import React from "react";
import './PerformanceCard.css'; // CSS 파일 연결

const PerformanceCard = ({ performance }) => {
    return (
        <div className="col-3"> {/* 한 카드가 3칸 차지 */}
            <div className="performance-card d-flex"> {/* Flexbox의 레이아웃, 좌우 배치 */}
                <div className="poster">
                    <img
                        src={performance.poster}
                        alt={`${performance.prfnm} 포스터`}
                        className="poster-image"
                    />
                </div>
                <div className="performance-details">
                    <h3>{performance.prfnm}</h3>
                    <p>기간: {performance.prfpdfrom} ~ {performance.prfpdto}</p>
                    <p>장소: {performance.fcltynm}</p>
                    <p>장르: {performance.genrenm}</p>
                    <p>상태: {performance.prfstate}</p>
                </div>
            </div>
        </div>

    );
};

export default PerformanceCard;
