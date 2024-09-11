import React, { useEffect } from 'react';
import { useContentsDetail } from '../../hooks/useContentsDetail';
import { Spinner } from 'react-bootstrap';

const ContentsDetailPage = ({contentId}) => {
const { data, isLoading, error } = useContentsDetail(contentId);
console.log(data)

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
            <h2>{performance?.prfnm || '공연명 없음'}</h2>
        </div>
    );
};

export default ContentsDetailPage;
