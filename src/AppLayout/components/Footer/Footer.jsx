import {Container, Row, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import './FooterStyle.css';

const Footer = () => {
  return (
    <footer id="footer" className="py-4 mt-5" style={{borderTop: '2px solid #dfdfdfaa'}}>
      <Container>
        <Row className="mt-3 row-gap-3">
          <Col md={6} className="pb-3 text-center cus-line">
            <h3 className="mb-2">코알누 리액트 그룹 프로젝트 8조</h3>
            <h4 className="mb-4">공연 예술 정보 페이지</h4>
            <p className="mb-2">Project Duration</p>
            <p>2024.09.08 - 2024.09.15</p>
            <br />
            <a
              href="https://github.com/leesangwon231/react-consert-site"
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-center gap-2 justify-content-center">
              <h5>GitHub</h5>
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
          </Col>

          <Col md={6} className="mb-3">
            <div className="d-flex flex-column justify-content-center">
              <div className="mb-3 fs-4 d-flex gap-2 align-items-center justify-content-center">
                <FontAwesomeIcon icon={faUser} /> Team Member
              </div>
              <div className="name-list fs-5 d-flex align-self-center flex-column row-gap-2">
                <div className="name-box">
                  <span className="name me-3 fw-bold">김성민</span>
                  <span>PO | 메인, 순위 페이지</span>
                </div>
                <div className="name-box">
                  <span className="name me-3 fw-bold">이상원</span>
                  <span>SM | 콘텐츠 페이지</span>
                </div>
                <div className="name-box">
                  <span className="name me-3 fw-bold">정민지</span>
                  <span>지역, 공연장 상세 페이지</span>
                </div>
                <div className="name-box">
                  <span className="name me-3 fw-bold">도수빈</span>
                  <span>검색 페이지</span>
                </div>
                <div className="name-box">
                  <span className="name me-3 fw-bold">최지윤</span>
                  <span>콘텐츠 상세 페이지, Not Found 페이지</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <hr style={{borderTop: '3px solid #dfdfdfaa'}} />
        <Row>
          <Col>
            <div className="d-flex justify-content-center flex-wrap gap-2">
              <span>사용 API</span>
              <div className="link-box">
                <a href="http://www.kopis.or.kr" target="_blank" rel="noopener noreferrer" className='mb-1'>
                  (재)예술경영지원센터 공연예술통합전산망
                </a>
                <a href="https://developers.kakao.com/console/app" target="_blank" rel="noopener noreferrer">
                  KAKAO developers
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
