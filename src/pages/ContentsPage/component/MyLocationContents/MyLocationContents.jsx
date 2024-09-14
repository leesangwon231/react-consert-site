import React, {useEffect, useState} from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import axios from "axios";
import ContentCard from "../common/ContentCard/ContentCard.jsx";
import "./MyLocationContents.css"
import {useLocationContents} from "../../../../hooks/useContentsLocation.jsx";
import {Spinner} from "react-bootstrap";
import AOS from "aos";
import 'aos/dist/aos.css';

const MyLocationContents = ({ctprvn,performanceKinds}) => {
    //진척도
    const [myLocation , setMyLocation] = useState({name : "" , signgucode : "", shcate : ""});
    const [locationContents,SetLocationContents] = useState([]);

    const {data,isLoading} = useLocationContents(myLocation);

    //내 위치 찾기
    const getMyLocation = async () => {
        try {
            console.log("b")
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
    }, []);

    useEffect(() => {

        const fetchLocation = async () => {
            const city = await getMyLocation();
            setMyLocation({...myLocation, name: city, signgucode: ctprvn[city] , shcate: performanceKinds[1]});
        };

        fetchLocation();

        if(Array.isArray(data?.dbs.db)){
            SetLocationContents(data?.dbs.db)
        }else{
            SetLocationContents([data?.dbs.db])
        }
    }, [data]);



  return (
    <div className={"ContentsPage_LocationContainer"}>
        <Container>
            <Row className={"ContentsPage_row"}>
                <Col className="ContentsPage_text-center_location"><span className={"ContentsPage_text-center_span"}>{myLocation?.name}</span>  에서  <span className={"ContentsPage_text-center_span"}>{performanceKinds[0]}</span>  보는건 어때?</Col>
                <Col className={"ContentsPage_col-lg-12"} lg={12} xs={12}>
                    <Row>
                        {isLoading
                            ? <Spinner animation="border" variant="dark"/>
                            : locationContents?.map((content, index) => (
                                <Col lg={3} xs={12} key={index}>
                                    <ContentCard content={content} index={index}/>
                                </Col>
                            ))
                        }
                    </Row>
                </Col>
            </Row>
        </Container>
    </div>
  );
}

export default MyLocationContents;