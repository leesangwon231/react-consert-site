import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useContents } from "../../../../hooks/useContents.jsx";
import ContentCard from "../common/ContentCard/ContentCard.jsx";
import "./AllContents.css";
import ContentFilter from "../ContentFilter/ContentFilter.jsx";
import { Spinner } from "react-bootstrap";
import PageNation from "../PageNation/PageNation.jsx";
import Slider from "../common/Slider/Slider.jsx";
import LoadingSpinner from "../../../../common/LoadingSpinner/LoadingSpinner.jsx";

const AllContents = ({
                         performanceFilterArray,
                         performanceKinds,
                         idArray,
                         performanceState,
                         setPerformanceState,
                         performanceSort,
                         setPerformanceSort,
                         isLoading,
                         originData,
                         page,
                         setPage,
                         isError
                     }) => {

    return (
        <div>
            <Slider idArray={idArray} isLoading={isLoading} />
            <ContentFilter
                performanceFilterArray={performanceFilterArray}
                performanceState={performanceState}
                setPerformanceState={setPerformanceState}
                performanceSort={performanceSort}
                setPerformanceSort={setPerformanceSort}
            />
            <Container className={"ContentsPage_All_Container"}>
                <Row className={"ContentsPage_row"}>
                    <Col className="ContentsPage_text-center">{performanceKinds[0]}</Col>
                    <Col className={"ContentsPage_col-lg-12"} lg={12} xs={12}>
                        <Row>
                            {isLoading
                                ? <LoadingSpinner/>
                                : originData?.length === 0
                                    ? <h1 className={"ContentsPage_NotFoundText"}>검색 결과가 없습니다</h1>
                                    : originData?.map((content, index) => (
                                        <Col lg={3} xs={12} key={index}>
                                            <ContentCard content={content} index={index} />
                                        </Col>
                                    ))
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
            {originData?.length === 0 ? "" : <PageNation page={page} setPage={setPage} />}
        </div>
    );
};

export default AllContents;