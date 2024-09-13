import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useContents} from "../../../../hooks/useContents.jsx";
import ContentCard from "../ContentCard/ContentCard.jsx";
import "./AllContents.css"
import ContentFiler from "../ContentFilter/ContentFilter.jsx";
import {Spinner} from "react-bootstrap";
import PageNation from "../PageNation/PageNation.jsx";

const  AllContents = ({performanceFilterArray,performanceKinds}) => {


    //필터링을 위한 데이터
    const [originData , setOriginData] = useState([]);

    //정렬 값
    const [sortWordFlag, setSortWordFlag] = useState(false);
    const [sortLatestFlag, setSortLatestFlag] = useState(false);
    const [performanceSort , setPerformanceSort] = useState({});
    //필터링 값
    const [performanceState , setPerformanceState] = useState({});

    //페이지네이션
    const [page,setPage] = useState(1);

    /*검색용 파라미터
    * signgucode : 시도
    * prfstate : 공연상태
    * shcate : 공연종류
    * page : 페이지
    * */
    const [param , setParam] = useState({
        shprfnm : "",
        signgucode : "",
        prfstate : "",
        shcate :  performanceKinds[1],
        page : 1,
    });

    // 화면 뿌릴 데이터
    const {data,isLoading} = useContents(param);


    const sortedWord = (unSortedData) => {
        return unSortedData.sort((a, b) => a.prfnm.localeCompare(b.prfnm));
    }

    const sortedLatest = (unSortedData) => {


        return unSortedData.sort((a, b) =>{
            a = a.prfpdfrom.split('.').join('');
            b = b.prfpdfrom.split('.').join('');
            return  b.localeCompare(a);
        })
    }

    //초기데이터 세팅
    useEffect(() => {


        // api에서 1개만 있으면 배열에 안 넣어 주어서 배열처리
        let originFilterData = data?.dbs?.db ? (Array.isArray(data.dbs.db) ? [...data.dbs.db] : [data.dbs.db]) : [];

        // 공연 상태 필터링
        if(Object.keys(performanceState).length !== 0){

            originFilterData = originFilterData.filter((performance) => {
                return performance.prfstate.includes(Object.values(performanceState)[0]);
            });
        }

        //정렬
        if(Object.keys(performanceSort)[0] === "01"){
            originFilterData = sortedWord(originFilterData);
        }else if(Object.keys(performanceSort)[0] === "02"){
            originFilterData = sortedLatest(originFilterData);
        }else if(Object.keys(performanceSort)[0] === "03"){
            console.log(originFilterData.prfpdto)
        }

        //최종데이터 세팅
        setOriginData(originFilterData);

    }, [param,data,performanceState,performanceSort]);


    useEffect(() => {
        setParam({...param, shcate: performanceKinds[1]  ,page : page})
    }, [page]);



    return (
        <div>
            <ContentFiler performanceFilterArray={performanceFilterArray}
                          performanceState = {performanceState}
                          setPerformanceState = {setPerformanceState}
                          performanceSort = {performanceSort}
                          setPerformanceSort = {setPerformanceSort}
            />
            <Container className={"ContentsPage_All_Container"}>
                <Row className={"ContentsPage_row"}>
                    <Col className="ContentsPage_text-center">공공예술</Col>
                    <Col className={"ContentsPage_col-lg-12"} lg={12} xs={12} >
                        <Row>
                            {isLoading
                                ?  <Spinner animation="border" variant="dark" />
                                : originData.length === 0
                                    ? <h1 className={"ContentsPage_NotFoundText"}>검색 된 결과가 없습니다</h1>
                                    : originData?.map((content,index) => (
                                    <Col lg={3} xs={12} key = {index}>
                                        <ContentCard content={content} index={index}/>
                                    </Col>
                                ))
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
            {originData.length === 0 ? "" : <PageNation page={page} setPage={setPage}/>}
        </div>
    );

}

export default AllContents;



