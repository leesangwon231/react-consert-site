/* eslint-disable react/prop-types */
import {useNavigate} from 'react-router-dom';
import {genreList} from '../../../../constants/constants';
import './RankingCardStyle.css';
const RankingCard = ({item}) => {
  const genreAddress = genreList.find((genre) => genre.genreName === item?.cate).genreAddress;
  const navigate = useNavigate();
  const navigateToDetailPage = () => {
    navigate(`/contents/${genreAddress}/${item?.mt20id}`);
  };
  return (
    <div className="ranking-card-box border p-3 shadow-sm rounded-3" onClick={() => navigateToDetailPage()}>
      <div className="img-box">
        <img src={`http://www.kopis.or.kr${item?.poster}`} alt={item?.prfnm} className="rounded-3" />
        <div className="ranking-number">{item?.rnum}</div>
      </div>
      <div className="text-box mt-3">
        <h5 className="fw-bold mb-3">{item?.prfnm}</h5>
        <p className="mb-2">{item?.prfpd}</p>
        <p className='lh-sm'>{item?.prfplcnm}</p>
      </div>
    </div>
  );
};
export default RankingCard;
