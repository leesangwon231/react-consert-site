import React from 'react';
import { Container, Row } from 'react-bootstrap';
import "./ListCenter.css";
import ListCenterContainer from '../ListCenterContainer/ListCenterContainer'; // Correct import path

const ListCenter = ({ data }) => {  
    const centerEvents = data?.dbs?.db || [];
    
    return (
        <div className="search-center">
            <h3 className='list-title'>시설</h3>
            <div className='list-itemarea'>
                <Container fluid>
                    {centerEvents.length > 0 ? (
                        <>
                            <div className="list-titles">
                                <div className="list-detail">시설명</div>
                                <div className="list-detail">주소</div>
                                <div className="list-detail">전화번호</div>
                                <div className="list-detail">주요시설</div>
                            </div>
                            {centerEvents.map((event) => (
                                <Row key={event.mt10id} className="mb-4 list-container">
                                    <ListCenterContainer data={event.mt10id} />
                                </Row>
                            ))}
                        </>
                    ) : (
                        <h4 className="no-results">검색 결과가 없습니다</h4>
                    )}
                </Container>
            </div>
        </div>
    );
};

export default ListCenter;
