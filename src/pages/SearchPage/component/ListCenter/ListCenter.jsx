import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import "./ListCenter.css";
import ListCenterContainer from '../ListCenterContainer/ListCenterContainer';
import Pagination from '../../../../common/Pagination/Pagination'; 

const ListCenter = ({ data }) => {
    //console.log("ddd",data);

    const centerEvents = data?.dbs?.db || [];
    const totalCenters = centerEvents.length;

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5; 

    const pageCount = Math.ceil(totalCenters / itemsPerPage);

    const displayedEvents = centerEvents.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const isMobile = window.innerWidth <= 768;

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <div className="search-center">
            <h3 className='list-title'>시설 ({totalCenters})</h3>
            <div className='list-itemarea'>
                <Container fluid>
                    {totalCenters > 0 ? (
                        <>
                            <div className="list-titles">
                                <div className="list-detail">시설명</div>
                                <div className="list-detail">주소</div>
                                <div className="list-detail">전화번호</div>
                                <div className="list-detail">주요시설</div>
                            </div>
                            {displayedEvents.map((event) => (
                                <Row key={event.mt10id} className="mb-4 list-container">
                                    <ListCenterContainer data={event.mt10id} />
                                </Row>
                            ))}
                        </>
                    ) : (
                        <h4 className="no-results">검색 결과가 없습니다</h4>
                    )}
                    {totalCenters > itemsPerPage && (
                        <div className='pagination-container'>
                            <Pagination 
                            pageCount={pageCount}
                            currentPage={currentPage}
                            handlePageClick={handlePageClick}
                            isMobile={isMobile}
                            />
                        </div>
                    )}
                </Container>
            </div>
        </div>
    );
};

export default ListCenter;
