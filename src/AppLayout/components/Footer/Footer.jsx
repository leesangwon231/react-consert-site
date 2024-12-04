import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import './FooterStyle.css'

const Footer = () => {
  return (
    <footer className="py-4 mt-5" style={{ borderTop: "2px solid #dfdfdfaa" }}>
      <Container>
        <Row className="mt-3">
          <Col
            md={5}
            className="mb-3 text-center cus-line"
            >
            <h2>
              <strong>Vite REACT Project</strong>
            </h2>
            <p>Project Duration</p>
            <p>24.09.08 - 24.09.15</p>
            <br />
            <h5>GitHub</h5>
            <a
              href="https://github.com/leesangwon231/react-consert-site"
              target="_blank"
              rel="noopener noreferrer"
              className="me-3 mb-4"
            >
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
          </Col>

          <Col md={7} className="mb-3 text-center">
            <Row>
              <p className="mb-3">
                <FontAwesomeIcon icon={faUser} /> Team Member
              </p>
              <div style={{ lineHeight: "1.5" }}>
                <p><strong>김성민</strong> &nbsp;&nbsp;&nbsp;&nbsp; PO  |  Home Page</p>
                <p><strong>이상원</strong> &nbsp;&nbsp;&nbsp;&nbsp; SM | Contents Page</p>
                <p><strong>정민지</strong> &nbsp;&nbsp;&nbsp;&nbsp; Culture Page</p>
                <p><strong>도수빈</strong> &nbsp;&nbsp;&nbsp;&nbsp; Search Page</p>
                <p><strong>최지윤</strong> &nbsp;&nbsp;&nbsp;&nbsp; ContentsDeatil Page</p>
              </div>
              
            </Row>
          </Col>
        </Row>
        <hr style={{ borderTop: "3px solid #dfdfdfaa" }} />
        <Row>
          <Col className="text-center">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p className="me-4">API Sources</p>
              <a
                href="http://www.kopis.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="me-4"
              >
                (재)예술경영지원센터 공연예술통합전산망
              </a>
              <a
                href="https://developers.kakao.com/console/app"
                target="_blank"
                rel="noopener noreferrer"
              >
                KAKAO developers
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
