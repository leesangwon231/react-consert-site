import './TextCardStyle.css';

const TextCard = () => {
  return (
    <div className="text-card-box border p-3 shadow-sm rounded-3">
      <div className="img-box">
        <img src="http://www.kopis.or.kr/upload/pfmPoster/PF_PF248732_240910_125126.png" alt="" className="rounded-3" />
      </div>
      <div className="text-box mt-3">
        <h5 className="fw-bold mb-3">ARTMS World Tour, Moonshot [서울]</h5>
        <span className="me-2">2024.07.20 ~ 2024.07.21</span>
        <span>이화여자대학교 삼성홀</span>
      </div>
    </div>
  );
};
export default TextCard;
