import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import "./ListCenter.css";
import ListCenterContainer from '../ListCenterContainer/ListCenterContainer';

const ListCenter = ({ data }) => {
    console.log("ddd",data);

    const centerEvents = data?.dbs?.db || [];
    const totalCenters = centerEvents.length;

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5; 

    const pageCount = Math.ceil(totalCenters / itemsPerPage);

    const displayedEvents = centerEvents.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

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
                        <div className="pagination-container">
                            <ReactPaginate
                                previousLabel="<"
                                nextLabel=">"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                containerClassName="pagination"
                                activeClassName="active"
                                forcePage={currentPage}
                            />
                        </div>
                    )}
                </Container>
            </div>
        </div>
    );
};

export default ListCenter;
