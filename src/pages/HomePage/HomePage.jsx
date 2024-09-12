import {Container} from 'react-bootstrap';
import './HomePageStyle.css';

const array = [1, 2, 3, 4, 5, 6, 7, 8];

const HomePage = () => {
  return (
    <Container className="homepage-container">
      <div className="card-box-container d-flex gap-3 flex-wrap">
        {array.map((i) => (
          <div key={i} className="card-box border p-3 shadow-sm rounded-3">
            <div className="img-box">
              <img src="http://www.kopis.or.kr/upload/pfmPoster/PF_PF248732_240910_125126.png" alt="" />
            </div>
            <div className="text-box mt-3">
              <h5 className="fw-bold mb-3">ARTMS World Tour, Moonshot [서울]</h5>
              <span className="me-2">2024.07.20 ~ 2024.07.21</span>
              <span>이화여자대학교 삼성홀</span>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default HomePage;
