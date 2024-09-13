import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContentsDetail } from "../../hooks/useContentsDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Spinner,
  Card,
  Button,
  Modal,
} from "react-bootstrap";

const ContentsDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useContentsDetail(id);
  const [activeTab, setActiveTab] = useState(null);

  const [showModal, setShowModal] = useState(false);

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

  const contentDetail = data?.dbs?.db;

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <p>오류가 발생했습니다: {error.message}</p>;
  }

  return (
    <Container
      className="detail-page-container mt-3"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <Row>
        <Col xs={12}>
          <hr
            style={{
              backgroundColor: "#383554",
              height: "3px",
              border: "none",
              borderRadius : "3px"
            }}
          />
        </Col>
      </Row>
      <Row className="gx-1">
        <Col md={6} xs={12} className="d-flex justify-content-center mb-4">
          <img
            src={contentDetail?.poster || "not poster"}
            alt="포스터"
            style={{ width: "100%", maxWidth: "400px" }}
          />
        </Col>
        <Col md={6} xs={12}>
          <Card style={{ backgroundColor: "#f8f9fa", border: "none" }}>
            <Card.Body>
              <Card.Title>
                <h2>{contentDetail?.prfnm || "공연 제목"}</h2>
              </Card.Title>
              <Card.Subtitle className="mb-2">
                {contentDetail?.prfpdfrom} - {contentDetail?.prfpdto}
              </Card.Subtitle>
              <Card.Text>
                <strong>공연 상태</strong>
                : {contentDetail?.prfstate || "정보 없음"}
              </Card.Text>
              <Card.Text>
                <strong>장르</strong>
                : {contentDetail?.genrenm || "정보 없음"}
              </Card.Text>
              <Card.Text>
                <strong>등급</strong>
                : {contentDetail?.prfage || "정보 없음"}
              </Card.Text>
              <Card.Text>
              <strong>런타임</strong>
                : {contentDetail?.prfruntime || "정보 없음"}
              </Card.Text>
              <Card.Text>
              <strong>가격</strong>
                : {contentDetail?.pcseguidance || "정보 없음"}
              </Card.Text>
              <hr
                style={{
                  backgroundColor: "#383554",
                  height: "3px",
                  border: "none",
                  borderRadius : "3px"
                }}
              />
              <Card.Subtitle><strong>공연 시간</strong></Card.Subtitle>
              <Card.Text>
              <br/>
                {contentDetail?.dtguidance
                  ? contentDetail.dtguidance.split(",").map((item, index) => (
                      <span key={index} >
                        {item.trim()}
                        <br/><br />
                      </span>
                    ))
                  : "정보 정보가 없습니다."}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={12}>
          <Button
            style={
              activeTab === "reservation"
                ? { backgroundColor: "#383554", border: "none" }
                : { backgroundColor: "#aaaaaa", border: "none" }
            }
            onClick={() => setActiveTab("reservation")}
            className="me-2"
          >
            예매 정보
          </Button>

          <Button
            style={
              activeTab === "details"
                ? { backgroundColor: "#383554", border: "none" }
                : { backgroundColor: "#aaaaaa", border: "none" }
            }
            onClick={() => setActiveTab("details")}
            className="me-2"
          >
            상세정보
          </Button>

          <Button
            style={
              activeTab === "imageInfo"
                ? { backgroundColor: "#383554", border: "none" }
                : { backgroundColor: "#aaaaaa", border: "none" }
            }
            onClick={() => setActiveTab("imageInfo")}
          >
            공연장 정보
          </Button>
        </Col>
      </Row>

      <Row className="mt-4">
        {activeTab === "reservation" && (
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  {contentDetail?.relates?.relate.relatenm || "정보없음"}
                </Card.Title>
                <Card.Text>
                  {contentDetail?.relates?.relate && (
                    <div>
                      <a
                        href={
                          contentDetail.relates.relate.relateurl || "정보없음"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        예매처로 이동
                      </a>
                    </div>
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )}

        {activeTab === "details" && (
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>상세 정보</Card.Title>
                <Card.Text>
                  줄거리: {contentDetail?.sty || "정보 없음"}
                </Card.Text>
                <Card.Text>
                  지역: {contentDetail?.area || "정보 없음"}
                </Card.Text>
                <Card.Text>
                  출연진: {contentDetail?.prfcast || "정보 없음"}
                </Card.Text>
                <Card.Text>
                  기획/제작사: {contentDetail?.entrpsnm || "정보 없음"}
                </Card.Text>

                <Button
                  style={{ backgroundColor: "#cea6c0", border: "none" }}
                  onClick={handleModalOpen}
                >
                  상세 이미지 보기
                </Button>

                <Modal show={showModal} onHide={handleModalClose} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>상세 이미지</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {contentDetail?.styurls?.styurl ? (
                      <img
                        src={contentDetail.styurls.styurl}
                        alt="소개 이미지"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      <p>상세 이미지가 없습니다.</p>
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                      닫기
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Card.Body>
            </Card>
          </Col>
        )}

        {activeTab === "imageInfo" && (
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>공연장 정보</Card.Title>
                <Card.Text>
                  {contentDetail?.fcltynm || "정보 정보가 없습니다."}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ContentsDetailPage;
