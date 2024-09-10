import React, {useEffect, useState} from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import axios from "axios";
import ContentCard from "../ContentCard/ContentCard.jsx";
import "./MyLocationContents.css"
import {useLocationContents} from "../../../../hooks/getContentsLocation.jsx";

const MyLocationContents = () => {

    const [myLocation , setMyLocation] = useState({name : "" , signgucode : ""});
    const [locationContents,SetLocationContents] = useState([]);

    const {data} = useLocationContents(myLocation.signgucode);
    console.log()

    const ctprvn = {
        "서울특별시": 11,"부산광역시": 26,"대구광역시": 27,
        "인천광역시": 28, "광주광역시": 29,"대전광역시": 30,
        "울산광역시": 31,"세종특별자치시": 36,"경기도": 41,
        "강원특별자치도": 42,"충청북도": 43,"충청남도": 44,
        "전라북도": 45,"전라남도": 46,"경상북도": 47,
        "경상남도": 48,"제주특별자치도": 50
    };

    //내 위치 찾기
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
        const fetchLocation = async () => {
            const city = await getMyLocation();
            setMyLocation({...myLocation, name: city, signgucode: ctprvn[city] });
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
            <Row>
                <Col className="text-center">{myLocation?.name} 에서 이런걸 보는건 어때?</Col>
                <Col lg={12} xs={12}>
                    <Row>
                        {locationContents?.map((content,index) => (
                            <Col lg={2} xs={12} key = {index}>
                                <ContentCard content={content}/>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    </div>
  );
}

export default MyLocationContents;