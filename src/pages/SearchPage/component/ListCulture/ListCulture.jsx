import React from 'react';
import { Container, Row } from 'react-bootstrap';
import "./ListCulture.css";

const ListCulture = ({ data }) => {
    //console.log("Received data:", data); 

    const culturalEvents = data?.dbs?.db || [];
    const totalCulturals = culturalEvents.length;

    return (
        <div className="search-culture">
            <h3 className='list-title'>공연 ({totalCulturals})</h3>
            <div className='list-itemarea'>
                <Container fluid>
                    {totalCulturals > 0 ? (
                    //{culturalEvents.length > 0 ? (
                        culturalEvents.map((event) => (
                            <Row key={event.mt20id} className="mb-4 list-container">
                                <div className="list-item">
                                    <img 
                                        className="list-img"
                                        src={event.poster}
                                        alt={event.prfnm}
                                    />
                                    <div className="list-details">
                                        <div className="list-detail-group">
                                            <div>{event.prfstate}</div>
                                            <div>{event.prfnm}</div>
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
                </Container>
            </div>
        </div>
    );
};

export default ListCulture;
