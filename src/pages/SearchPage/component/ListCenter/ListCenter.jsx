import React from 'react';
import { Container, Row } from 'react-bootstrap';
import "./ListCenter.css";


const ListCenter = ({data}) => {  // props 이름을 id로 사용
//   const { data: centerData, error, isLoading } = useSearchCenterDeatils(id);  // id를 올바르게 전달

//   if (isLoading) {
//       return <div>Loading...</div>;
//   }

//   if (error) {
//       return <div>Error: {error.message}</div>;
//   }

    const centerEvents = data?.dbs?.db || [];
  return (
    <div className="search-center">
        <h3 className='list-title'>시설</h3>
        <div className='list-itemarea'>
            <Container fluid>
                {centerEvents.map((event) => (
                    <Row key={event.mt10id} className="mb-4 list-container">
                        <div className="list-item">
                            <div className="list-details">
                                <div className="list-detail">{event.fcltynm}</div>
                                <div className="list-detail">{event.fcltychartr}</div>
                                <div className="list-detail">{event.sidonm} {event.gugunnm}</div>
                            </div>
                        </div>
                    </Row>
                ))}
            </Container>
        </div>
    </div>
  );
}

export default ListCenter;
