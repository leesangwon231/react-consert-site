import React, { useState, useEffect } from 'react';
import { Container, Row, Badge } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useNavigate } from "react-router-dom"
import "./ListCulture.css";

const ListCulture = ({ data }) => {
    //console.log("ddd",data);

    const culturalEvents = data?.dbs?.db || [];
    const totalCulturals = culturalEvents.length;

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5; 

    const pageCount = Math.ceil(totalCulturals / itemsPerPage);

    const displayedEvents = culturalEvents.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const navigate = useNavigate(); 
    const handleClick = (id) => {
        navigate(`/contents/${id}`);
    };
    

    const isMobile = window.innerWidth <= 768;

    return (
        <div className="search-culture">
            <h3 className='list-title'>공연 ({totalCulturals})</h3>
            <div className='list-itemarea'>
                <Container fluid>
                    {totalCulturals > 0 ? (
                        displayedEvents.map((event) => (
                            <Row key={event.mt20id} className="mb-4 list-container">
                                <div className="list-item"
                                    onClick={() => handleClick(event.mt20id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <img 
                                        className="list-img"
                                        src={event.poster}
                                        alt={event.prfnm}
                                    />
                                    <div className="list-details">
                                        <div className="list-detail-group">
                                            <Badge className={
                                                `badge-status
                                                ${event.prfstate === '공연예정' 
                                                ? 'pending' : event.prfstate === '공연중'
                                                ? 'ongoing' : 'completed'}`
                                            }>
                                                {event.prfstate}
                                            </Badge>
                                            <div className="list-detail-title">{event.prfnm}</div>
                                        </div>
                                        <div className="list-detail">{event.fcltynm}</div>
                                        <div className="list-detail">{event.prfpdfrom} ~ {event.prfpdto}</div>
                                    </div>
                                </div>
                            </Row>
                        ))
                    ) : (
                        <h4 className="no-results">검색 결과가 없습니다</h4>
                    )}
                    {totalCulturals > itemsPerPage && (
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

export default ListCulture;