import React from "react";
import { useContents } from "../../hooks/useGetContents";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const ContentsDetailPage = () => {
  const tests = useContents();
  console.log(tests);

  return (
    <Container>
      <Row className="mb-4">
        <Col md={4} style={{ background: "black", width: "100%" }}>
          포스터
        </Col>
        <Col md={8}>
          <Card style={{ background: "black", color: "white" }}>
            <Card.Body>
              <Card.Title>
                <h2>공연명</h2>
              </Card.Title>
              <Card.Subtitle className="mb-2">줄거리</Card.Subtitle>
              <Card.Text>
                공연시작~종료일, 공연장명, 출연진, 런타임, 관람연령, 제작사/기획사,
                티켓가격, 지역, 장르, 공연상태, 소개이미지, 공연시간, 예매처목록
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Button>예매처</Button>
          <Button>리뷰 쓸 수 있는</Button>
          <Button>다른 공연</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ContentsDetailPage;
