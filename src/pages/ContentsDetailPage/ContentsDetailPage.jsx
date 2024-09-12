import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContentsDetail } from "../../hooks/useContentsDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Card, Spinner } from "react-bootstrap";

const ContentsDetailPage = () => {
  const { id } = useParams();  
  const { data, isLoading, error } = useContentsDetail(id);
  
  useEffect(() => {
    if (isLoading) {
      console.log("상세 정보를 불러오는 중입니다...");
    }

    if (error) {
      console.error("상세 정보를 불러오는 중 오류 발생:", error);
    }

    if (data) {
      console.log("불러온 상세 정보:", data);
    }
  }, [data, isLoading, error]);

  // data?.dbs?.db 객체를 변수로 할당
  const contentDetail = data?.dbs?.db;

  // 로딩 중일 때 Spinner 추가
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  // 오류가 있을 때 메시지 표시
  if (error) {
    return <p>오류가 발생했습니다: {error.message}</p>;
  }

  
  return (
    <Container className="detail-page-container">
      <Row className="mb-4">
        <Col md={4}>
          <img
            src={contentDetail?.poster || "http://tkfile.yes24.com/upload2/PerfBlog/202407/20240724/20240724-41222.jpg"}
            alt="포스터"
            style={{ width: "100%" }}
          />
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>
                <h2>{contentDetail?.prfnm || "공연 제목"}</h2>
              </Card.Title>
              <Card.Subtitle className="mb-2">
                {contentDetail?.prfpdfrom} - {contentDetail?.prfpdto}
              </Card.Subtitle>
              <Card.Text>등급: {contentDetail?.prfage || "정보 없음"}</Card.Text>
              <Card.Text>런타임: {contentDetail?.prfruntime || "정보 없음"}</Card.Text>
              <Card.Text>가격: {contentDetail?.pcseguidance || "정보 없음"}</Card.Text>
              <Card.Text>줄거리: {contentDetail?.sty || "줄거리 정보가 없습니다."}</Card.Text>
              <Card.Text>출연진: {contentDetail?.prfcast || "출연진 정보 없음"}</Card.Text>
              <Card.Text>
                <a href={contentDetail?.styurls?.styurl || "#"}>이미지 정보</a>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* 예매처 버튼 추가 */}
      <Row className="mt-4">
        <Col md={12} className="d-flex justify-content-center">
          <Button 
            style={{ backgroundColor: '#b8749d', borderColor: '#b8749d' }} 
            size="lg"
            href="https://예매처.com" // 예매처 링크로 대체
          >
            예매처
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ContentsDetailPage;
