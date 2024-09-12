import React from 'react';
import { useSearchCenterDeatils } from '../../../../hooks/useSearchCenterDetail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUtensils, faMugSaucer, faStore, faWheelchair, faSquareParking  } from '@fortawesome/free-solid-svg-icons';
import "./ListCenterContainer.css";

const ListCenterContainer = ({ data }) => { 
    const { data: centerData, error, isLoading } = useSearchCenterDeatils(data); 

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const relateUrl = centerData?.dbs?.db?.relateurl?.trim();
    const centerEvents = centerData?.dbs?.db || [];
    const hasWheelchair = 
        centerEvents.parkbarrier === 'Y' || 
        centerEvents.restbarrier === 'Y' || 
        centerEvents.runwbarrier === 'Y' || 
        centerEvents.elevbarrier === 'Y';

    return (
        <div className='search-center-detail'>
                <div className='search-center-container'>
                    <div className="list-detail">
                        {centerEvents.fcltynm}
                        {relateUrl && (
                            <a href={relateUrl} target="_blank" rel="noopener noreferrer" className="list-detail-link">
                                <FontAwesomeIcon icon={faHouse} />
                            </a>
                        )}
                    </div>
                <div className="list-detail">{centerEvents.adres}</div>
                <div className="list-detail">{centerEvents.telno}</div>
                <div className="list-detail">
                    {centerEvents.restaurant !== 'N' && <FontAwesomeIcon icon={faUtensils} />}
                    {centerEvents.cafe !== 'N' && <FontAwesomeIcon icon={faMugSaucer} />}
                    {centerEvents.store !== 'N' && <FontAwesomeIcon icon={faStore} />}
                    {hasWheelchair && <FontAwesomeIcon icon={faWheelchair} />}
                    {centerEvents.parkinglot !== 'N' && <FontAwesomeIcon icon={faSquareParking} />}
                </div>
            </div>
        </div>
    );
};

export default ListCenterContainer;
