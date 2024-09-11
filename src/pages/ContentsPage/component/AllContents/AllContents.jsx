import React, {useEffect} from 'react';
import { useState} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useContents} from "../../../../hooks/useContents.jsx";
import ContentCard from "../ContentCard/ContentCard.jsx";
import "./AllContents.css"
import ContentFiler from "../ContentFilter/ContentFilter.jsx";
import ProgressBar from "react-bootstrap/ProgressBar";
import {Spinner} from "react-bootstrap";

const  AllContents = ({performanceFilterArray}) => {


    //필터링을 위한 데이터
    const [originData , setOriginData] = useState([]);

    //필터링 값
    const [ctprvnFlag, setCtprvnFlag] = useState(null);
    const [performanceKind , setPerformanceKind] = useState(null);
    const [performanceState , setPerformanceState] = useState(null);

    //검색용 파라미터
    const [param , setParam] = useState({    shprfnm : "",
        signgucode : "",
        prfstate : "",
        shcate : "",
    });
    
    // 화면 뿌릴 데이터
    const {data,isLoading} = useContents(param);

    //초기데이터 세팅
    useEffect(() => {

        if(Array.isArray(data?.dbs.db)) {
            setOriginData(data?.dbs.db);
        }else{
            setOriginData([data?.dbs.db]);
        }
    }, [param,data]);

    useEffect(() => {
        setParam({...param,signgucode: ctprvnFlag ,shcate: performanceKind , prfstate: performanceState})
    }, [ctprvnFlag,performanceKind,performanceState]);



    return (
        <div>
            <ContentFiler performanceFilterArray={performanceFilterArray}
                          performanceKind = {performanceKind}  setPerformanceKind = {setPerformanceKind}
                          performanceState = {performanceState} setPerformanceState = {setPerformanceState}
                          ctprvnFlag = {ctprvnFlag} setCtprvnFlag = {setCtprvnFlag}/>

            <Container>
                <Row>
                    <Col className="text-center">공공예술</Col>
                    <Col lg={12} xs={12}>
                        <Row>
                            {isLoading
                                ?  <Spinner animation="border" variant="dark" />
                                : originData?.map((content,index) => (
                                    <Col lg={2} xs={12} key = {index}>
                                        <ContentCard content={content}/>
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

export default AllContents;



