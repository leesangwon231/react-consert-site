import React from 'react';
import { Container, Row } from 'react-bootstrap';
import "./ListCulture.css";

const ListCulture = ({ data }) => {
    const culturalEvents = data?.dbs?.db || [];

    return (
        <div className='list-Allcontainer'>
            <h3 className='list-title'>공연</h3>
            <div className='list-itemarea'>
                <Container fluid>
                    {culturalEvents.map((event) => (
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
                    ))}
                </Container>
            </div>
        </div>
    );
};

export default ListCulture;
