import React from 'react';
import {useEffect, useState} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useContents} from "../../../../hooks/getContents.jsx";
import ContentCard from "../ContentCard/ContentCard.jsx";

const  AllContents = () => {

/* 파라미터 (데이터 검색용)
        * shprfnm : 연극명 (검색)
        * signgucode : 지역 (
        * 서울광역시 : 11  , 부산광역시 : 26 , 대구광역시 : 27,
        * 인천광역시 : 28  , 광주광역시 : 29 , 대전광역시 : 30 ,
        * 울산광역시 : 31 , 세종특별자치도 : 36 , 경기도 : 41,
        * 강원특별자치도 : 51 , 충청북도 : 43 , 충청남도 : 44 ,
        * 전북특별자치도 : 45 , 전라남도 : 46 , 경상북도 : 47,
        * 경상남도 : 48 , 제주특별자치도 : 50
        * )
        * prfstate : 공연상태코드 (공연 예정 : 01, 공연중 : 02 , 공연완료 : 03)
        * shcate : 장르 (GGGA : 뮤지컬 , CCCD : 콘서트 , BBBC : 클래식/무용 , AAAA :연극)
        * */


    const [originData , setOriginData] = useState([]);


    const [param , setParam] = useState({    shprfnm : "",
                                                            signgucode : "",
                                                            prfstate : "",
                                                            shcate : "",
                                                        });

    const {data} = useContents(param);


    useEffect(() => {
        if(Array.isArray(data?.dbs.db)) {
            setOriginData(data?.dbs.db);

        }else{
            setOriginData([data?.dbs.db]);
        }

        //getMyLocation();
    }, [param,data]);


    // 테스트용 함수 삭제 예정
    const onCickTest = (genre) => {
        setParam({...param, shcate:genre})
    }



    return (
        <div>
            <div>
                <div onClick={()=>onCickTest("GGGA")}>뮤지컬</div>
                <div onClick={()=>onCickTest("CCCD")}>콘서트</div>
                <div onClick={()=>onCickTest("BBBC")}>클래식/무용</div>
                <div onClick={()=>onCickTest("AAAA")}>연극</div>
                <input type={"text"}/>
            </div>
            <Container>
                <Row>
                    <Col className="text-center">공공예술</Col>
                    <Col lg={12} xs={12}>
                        <Row>
                            {originData?.map((content,index) => (
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

export default AllContents;



