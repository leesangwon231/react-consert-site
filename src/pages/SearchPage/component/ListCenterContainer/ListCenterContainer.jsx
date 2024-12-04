import React from 'react';
import { useSearchCenterDeatils } from '../../../../hooks/useSearchCenterDetail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUtensils, faMugSaucer, faStore, faWheelchair, faSquareParking } from '@fortawesome/free-solid-svg-icons';
import "./ListCenterContainer.css";
import { useNavigate } from 'react-router-dom';

const ListCenterContainer = ({ data }) => {
    const { data: centerData, error, isLoading } = useSearchCenterDeatils(data.mt10id);
    const navigate = useNavigate();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const centerEvents = centerData?.dbs?.db || {};
    const relateUrl = centerData?.dbs?.db?.relateurl?.trim();
    const hasWheelchair = 
        centerEvents.parkbarrier === 'Y' || 
        centerEvents.restbarrier === 'Y' || 
        centerEvents.runwbarrier === 'Y' || 
        centerEvents.elevbarrier === 'Y';
    const shouldHideDetail = 
        !centerEvents.fcltynm 
        && !centerEvents.adres 
        && !centerEvents.telno 
        && !(centerEvents.restaurant !== 'N' || 
            centerEvents.cafe !== 'N' || 
            centerEvents.store !== 'N' || 
            hasWheelchair || 
            centerEvents.parkinglot !== 'N');

    const handleClick = (id) => {
        if (id) {
            navigate(`/hall/${id}`);
        } else {
            console.error('ID is undefined');
        }
    };

    return (
        <div className='search-center-detail'>
            <div className='search-center-container'
                onClick={() => handleClick(data.mt10id)}
                style={{ cursor: 'pointer' }}
            >
                <div className={`list-detail ${shouldHideDetail ? 'hidden' : ''}`}>
                    {centerEvents.fcltynm}
                    {relateUrl && (
                        <a href={relateUrl} target="_blank" rel="noopener noreferrer" className="list-detail-link">
                            <FontAwesomeIcon icon={faHouse} />
                        </a>
                    )}
                </div>
                <div className={`list-detail ${!centerEvents.adres ? 'hidden' : ''}`}>
                    {centerEvents.adres}
                </div>
                <div className={`list-detail ${!centerEvents.telno ? 'hidden' : ''}`}>
                    {centerEvents.telno}
                </div>
                {!(centerEvents.restaurant === 'N' && centerEvents.cafe === 'N' && centerEvents.store === 'N' && !hasWheelchair && centerEvents.parkinglot === 'N') && (
                    <div className={`list-detail ${shouldHideDetail ? 'hidden' : ''}`}>
                        {centerEvents.restaurant !== 'N' && <FontAwesomeIcon icon={faUtensils} />}
                        {centerEvents.cafe !== 'N' && <FontAwesomeIcon icon={faMugSaucer} />}
                        {centerEvents.store !== 'N' && <FontAwesomeIcon icon={faStore} />}
                        {hasWheelchair && <FontAwesomeIcon icon={faWheelchair} />}
                        {centerEvents.parkinglot !== 'N' && <FontAwesomeIcon icon={faSquareParking} />}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListCenterContainer;
