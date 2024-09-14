import React, { useEffect, useState } from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import axios from "axios";
import ContentCard from "../common/ContentCard/ContentCard.jsx";
import "./MyLocationContents.css";
import { useLocationContents } from "../../../../hooks/useContentsLocation.jsx";
import { Spinner } from "react-bootstrap";
import AOS from "aos";
import 'aos/dist/aos.css';
import LoadingSpinner from "../../../../common/LoadingSpinner/LoadingSpinner.jsx";

const MyLocationContents = ({ ctprvn, performanceKinds }) => {
    const [myLocation, setMyLocation] = useState({ name: "", signgucode: "", shcate: "" });
    const [locationContents, setLocationContents] = useState([]);
    const { data, isLoading } = useLocationContents(myLocation);

    const getMyLocation = async () => {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const geocodeUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=ko`;
            const response = await axios.get(geocodeUrl);
            const city = response.data.address.city || response.data.address.state;
            return city;
        } catch (error) {
            console.error('Error location:', error);
        }
    };


    useEffect(() => {
        AOS.init();
        const fetchLocation = async () => {

            const city = await getMyLocation();
            if (city) {
                setMyLocation({ name: city, signgucode: ctprvn[city], shcate: performanceKinds[1] });
            }
        };

        fetchLocation();
    }, [ctprvn, performanceKinds]); // 위치와 관련된 상태가 변경될 때만 호출

    useEffect(() => {
        if (Array.isArray(data?.dbs.db)) {
            setLocationContents(data?.dbs.db);
        } else if (data?.dbs.db) {
            setLocationContents([data?.dbs.db]);
        }
    }, [data]);

    return (
        <div className={"ContentsPage_LocationContainer"}>
            <Container>
                <Row className={"ContentsPage_row"}>
                    <Col className="ContentsPage_text-center_location">
                        <span className={"ContentsPage_text-center_span"}>{myLocation?.name}</span> 에서 <span className={"ContentsPage_text-center_span"}>{performanceKinds[0]}</span> 보는건 어때?
                    </Col>
                    <Col className={"ContentsPage_col-lg-12"} lg={12} xs={12}>
                        <Row>
                            {isLoading
                                ? <LoadingSpinner/>
                                : locationContents?.length===0
                                    ? <h1 className={"ContentsPage_NotFoundText"}>검색 결과가 없습니다</h1>
                                    : locationContents?.map((content, index) => (
                                        <Col lg={3} xs={12} key={index}>
                                            <ContentCard content={content} index={index} />
                                        </Col>
                                    ))
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MyLocationContents;