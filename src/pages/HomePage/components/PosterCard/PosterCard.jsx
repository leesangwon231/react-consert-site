/* eslint-disable react/prop-types */
import {useNavigate} from 'react-router-dom';
import './PosterCardStyle.css';
import {genreList} from '../../../../constants/constants';

const PosterCard = ({item, gridArea}) => {
  const navigate = useNavigate();
  const genreAddress = genreList.find((genre) => genre.genreName === item?.genrenm).genreAddress;
  const navigateToDetailPage = () => {
    navigate(`/contents/${genreAddress}/${item?.mt20id}`);
  };

  return (
    <div className={`poster-card-box overflow-hidden rounded-3 shadow-lg ${gridArea}`} onClick={() => navigateToDetailPage()}>
      <img src={item?.poster} alt={item?.prfnm} />
      <div className="card-title fw-bolder position-absolute">{item?.prfnm}</div>
    </div>
  );
};
export default PosterCard;
