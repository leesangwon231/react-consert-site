import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useContentsDetail } from "../../hooks/useContentsDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";

const ContentsDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useContentsDetail(id);
  const [activeTab, setActiveTab] = useState("details");
  const navigate = useNavigate();
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const contentDetail = data?.dbs?.db;

  const handleVenueClick = () => {
    const venueId = contentDetail?.mt10id;
    if (venueId) {
      navigate(`/hall/${venueId}`);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const priceInfo = contentDetail?.pcseguidance
    ? contentDetail.pcseguidance
        .split(/(원,?)/)
        .reduce((acc, curr) => {
          if (curr.includes("원")) {
            acc[acc.length - 1] += curr;
          } else {
            acc.push(curr.trim());
          }
          return acc;
        }, [])
        .filter((price) => price.trim() !== "")
    : [];

  const formattedPriceInfo = priceInfo.map((price, i) => (
    <div key={i} style={{ marginBottom: "8px" }}>
      {price.split(/(\d+(?:,\d+)*)(원?)/).map((part, index) => {
        if (/^\d+(?:,\d+)*$/.test(part)) {
          return (
            <span key={index} style={{ color: "#ff0088" }}>
              {part}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </div>
  ));

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p>오류가 발생했습니다: {error.message}</p>;
  }

  return (
    <Container
      className="detail-page-container mt-3"
      style={{
        backgroundColor: "white",
        fontSize: "20px",
        padding: "20px",
        borderRadius: "10px",
      }}
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
            style={{ width: "100%", maxWidth: "400px", borderRadius: "5px" }}
          />
        </Col>
        <Col md={6} xs={12}>
          <Card style={{ backgroundColor: "white", border: "none" }}>
            <Card.Body>
              <Card.Title>
                <h1>{contentDetail?.prfnm || "공연 제목"}</h1>
              </Card.Title>
              <Card.Subtitle className="mb-2">
                {contentDetail?.prfpdfrom} - {contentDetail?.prfpdto}
              </Card.Subtitle>
              <Card.Text className="mt-3 mb-4">
                <strong>공연 상태</strong>: &nbsp;&nbsp;
                {contentDetail?.prfstate || "정보 없음"}
              </Card.Text>

              <Card.Text className="mb-4">
                <strong>등급</strong>: &nbsp;&nbsp;
                {contentDetail?.prfage || "정보 없음"}
              </Card.Text>
              <Card.Text className="mb-4">
                <strong>런타임</strong>: &nbsp;&nbsp;
                {contentDetail?.prfruntime || "정보 없음"}
              </Card.Text>
              <Card.Text className="mb-4 price d-flex align-items-center">
                <strong className="me-3">가격</strong>
                <div
                  style={{
                    backgroundColor: "#e2e2e2",
                    padding: "20px",
                    paddingRight: "35%",
                    display: "inline-block",
                    width: "auto",
                  }}
                >
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
                  ? contentDetail.dtguidance.split(", ").map((item, index) => (
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
          <Row>
            {contentDetail?.relates?.relate &&
            Array.isArray(contentDetail.relates.relate) ? (
              contentDetail.relates.relate.map((relateItem, index) => (
                <Col key={index} md={6} className="mb-4">
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        <strong>{relateItem.relatenm || "정보없음"}</strong>
                      </Card.Title>
                      <Card.Text>
                        <a
                          href={relateItem.relateurl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          예매처로 이동
                        </a>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <span>정보 없음</span>
              </Col>
            )}
          </Row>
        )}

        {activeTab === "details" && (
          <Col>
            <Card style={{ lineHeight: "1.5" }}>
              <Card.Body>
                <Card.Title>
                  <strong>상세 정보</strong>
                </Card.Title>
                <Card.Text>
                  <strong>줄거리:</strong>&nbsp;&nbsp;
                  {contentDetail?.sty || "정보 없음"}
                </Card.Text>
                <Card.Text>
                  <strong>지역:</strong> &nbsp;&nbsp;
                  {contentDetail?.area || "정보 없음"}
                </Card.Text>
                <Card.Text>
                  <strong>출연진:</strong>&nbsp;&nbsp;
                  {contentDetail?.prfcast || "정보 없음"}
                </Card.Text>
                <Card.Text>
                  <strong>기획/제작사:</strong>&nbsp;&nbsp;
                  {contentDetail?.entrpsnm || "정보 없음"}
                </Card.Text>

                {Array.isArray(contentDetail?.styurls?.styurl) ? (
                  contentDetail.styurls.styurl.map((url, index) => (
                    <Card.Text key={index} className="mt-4">
                      <img
                        src={url}
                        alt={`상세 이미지 ${index + 1}`}
                        style={{
                          width: "100%",
                          marginTop: "10px",
                          borderRadius: "5px",
                        }}
                      />
                    </Card.Text>
                  ))
                ) : (
                  <Card.Text className="mt-4">
                    <img
                      src={contentDetail.styurls.styurl}
                      alt="상세 이미지"
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        borderRadius: "5px",
                      }}
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

      {showScrollButton && (
        <Button
          onClick={handleScrollToTop}
          style={{
            position: "fixed",
            bottom: "40px",
            right: "40px",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "rgb(56, 53, 84, 0.7)",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            border: "none",
          }}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </Button>
      )}
    </Container>
  );
};

export default ContentsDetailPage;
