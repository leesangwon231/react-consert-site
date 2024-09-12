import React, { useEffect, useState } from 'react';
import { useContentsDetail } from '../../hooks/useContentsDetail';
import { Spinner } from 'react-bootstrap';

const ContentsDetailPage = (contentId) => {
    const { data, isLoading, error } = useContentsDetail(contentId);
    console.log("detail",data)
    const [performance, setPerformance] = useState(null);

    useEffect(() => {
        if (isLoading) {
            console.log("데이터를 불러오는 중입니다...");
        }

        if (error) {
            console.error("데이터를 불러오는 중 오류 발생:", error);
        }

        if (data) {
            console.log("불러온 데이터:", data);
            const fetchedData = data?.dbs?.db;  // 받아온 데이터를 상태에 저장
            setPerformance(fetchedData);
        }
    }, [data, isLoading, error]);

    return (
        <div>
            {isLoading && <Spinner animation="border" />}  {/* 로딩 중 */}
            {error && <p>데이터를 불러오는 중 오류가 발생했습니다.</p>}
            {performance ? (
                <div>
                    <h2>{performance?.prfnm || '공연명 없음'}</h2>
                    <p>공연 기간: {performance?.prfpdfrom} ~ {performance?.prfpdto}</p>
                    <p>공연장: {performance?.fcltynm}</p>
                    <p>출연진: {performance?.prfcast || '정보 없음'}</p>
                    <p>공연 상태: {performance?.prfstate}</p>
                </div>
            ) : (
                !isLoading && <p>데이터가 없습니다.</p>
            )}
        </div>
    );
};

export default ContentsDetailPage;
