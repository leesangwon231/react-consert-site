/* eslint-disable react/prop-types */
import {useNavigate} from 'react-router-dom';
import './TextCardStyle.css';
import {genreList} from '../../../../constants/constants';

const TextCard = ({item}) => {
  const genreAddress = genreList.find((genre) => genre.genreName === item?.genrenm).genreAddress;
  const navigate = useNavigate();
  const navigateToDetailPage = () => {
    navigate(`/contents/${genreAddress}/${item?.mt20id}`);
  };
  return (
    <div className="text-card-box border p-3 shadow-sm rounded-3" onClick={() => navigateToDetailPage()}>
      <div className="img-box">
        <img src={item?.poster} alt={item?.prfnm} className="rounded-3" />
      </div>
      <div className="text-box mt-3">
        <h5 className="fw-bold mb-3">{item?.prfnm}</h5>
      </div>
    </div>
  );
};
export default TextCard;
