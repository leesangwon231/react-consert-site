import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useContentsDetail } from "../../hooks/useContentsDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
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
  const [activeTab, setActiveTab] = useState("details");

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); 

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

  const handleVenueClick = () => {
    const venueId = contentDetail?.mt10id; 
    if (venueId) {
      navigate(`/hall/${venueId}`);
    }
  };

  const priceInfo = contentDetail?.pcseguidance
    ? contentDetail.pcseguidance
        .split(/(원)/)
        .reduce((acc, curr, idx) => {
          if (curr === "원") {
            acc[acc.length - 1] += curr;
          } else {
            acc.push(curr);
          }
          return acc;
        }, [])
        .filter((price) => price.trim() !== "")
    : [];

  // 가격 정보를 한 줄에 두 개씩 출력
  const formattedPriceInfo = [];
  for (let i = 0; i < priceInfo.length; i += 2) {
    formattedPriceInfo.push(
      <div key={i}>
        <span>{priceInfo[i]}</span>
        {priceInfo[i + 1] && <span>, {priceInfo[i + 1]}</span>}
      </div>
    );
  }

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
      style={{ backgroundColor: "white", fontSize: "20px", padding: "20px", borderRadius:"10px"}}
    >
      <Row>
        <Col xs={12}>
        <Card.Text>
                <strong>&gt;&gt; </strong>
                {contentDetail?.genrenm || "정보 없음"}
              </Card.Text>
          <hr
            style={{
              backgroundColor: "#383554",
              height: "3px",
              border: "none",
              borderRadius: "3px",
            }}
          />
        </Col>
      </Row>
      <Row className="gx-1">
        <Col md={6} xs={12} className="d-flex justify-content-center mb-4">
          <img
            src={contentDetail?.poster || "not poster"}
            alt="포스터"
            style={{ width: "100%", maxWidth: "400px", borderRadius: "5px"}}
          />
        </Col>
        <Col md={6} xs={12}>
          <Card style={{ backgroundColor: "white", border: "none"}}>
            <Card.Body>
              <Card.Title>
                <h1>{contentDetail?.prfnm || "공연 제목"}</h1>
              </Card.Title>
              <Card.Subtitle className="mb-2">
                {contentDetail?.prfpdfrom} - {contentDetail?.prfpdto}
              </Card.Subtitle>
              <Card.Text className="mt-3 mb-4">
                <strong>공연 상태</strong>
                : &nbsp;&nbsp;{contentDetail?.prfstate || "정보 없음"}
              </Card.Text>
              
              <Card.Text className="mb-4">
                <strong>등급</strong>
                : &nbsp;&nbsp;{contentDetail?.prfage || "정보 없음"}
              </Card.Text>
              <Card.Text className="mb-4">
                <strong>런타임</strong>
                : &nbsp;&nbsp;{contentDetail?.prfruntime || "정보 없음"}
              </Card.Text>
              <Card.Text className="mb-4 price">
                <strong>가격</strong>
                <div style={{ backgroundColor: "#e2e2e2", padding:"10px" }}>
                  {formattedPriceInfo}
                </div>
              </Card.Text>
              <hr
                style={{
                  backgroundColor: "#cea6c0",
                  height: "3px",
                  border: "none",
                  borderRadius: "3px",
                }}
              />
              <strong>공연 시간</strong>
              <Card.Text>
                <br />
                {contentDetail?.dtguidance
                  ? contentDetail.dtguidance.split(",").map((item, index) => (
                      <span key={index}>
                        {item.trim()}
                        <br />
                        <br />
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
                  <strong>
                    {contentDetail?.relates?.relate.relatenm || "정보없음"}
                  </strong>
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
                <Card.Title>
                  <strong>상세 정보</strong>
                </Card.Title>
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

                {contentDetail?.styurls?.styurl && (
                <Card.Text className="mt-4">
                  <img
                    src={contentDetail.styurls.styurl}
                    alt="상세 이미지"
                    style={{ width: "100%", marginTop: "10px", borderRadius: "5px" }}
                  />
                </Card.Text>
              )}
              </Card.Body>
            </Card>
          </Col>
        )}

        {activeTab === "imageInfo" && (
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  <strong>공연장 정보</strong>
                </Card.Title>
                <Card.Text>
                  {contentDetail?.fcltynm || "정보 정보가 없습니다."}
                  <FontAwesomeIcon
                    icon={faHouse}
                    className="icon"
                    onClick={handleVenueClick} 
                    style={{ cursor: "pointer" }} 
                  />
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
