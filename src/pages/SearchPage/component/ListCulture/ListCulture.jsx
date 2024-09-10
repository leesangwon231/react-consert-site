import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "./ListCulture.css";

const ListCulture = ({ data }) => {
    const culturalEvents = data?.dbs?.db || [];

    return (
        <div className='list-Allcontainer'>
            <Container fluid>
                <Row>
                    {culturalEvents.map((event) => (
                        <Col key={event.mt20id} md={4} lg={3} className="mb-4 list-container">
                            <div className="list-item">
                                <img 
                                    className="list-img"
                                    src={event.poster}
                                    alt={event.prfnm}
                                />
                                <Row>
                                    <Col className="list-detail1">
                                        <div>{event.prfstate}</div>
                                        <div>{event.prfnm}</div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="list-detail2">
                                        <div>{event.fcltynm}</div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="list-detail3">
                                        <div>{event.prfpdfrom} ~ {event.prfpdto}</div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default ListCulture;
