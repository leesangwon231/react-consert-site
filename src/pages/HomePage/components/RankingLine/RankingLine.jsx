import ErrorBox from '../../../../common/ErrorBox/ErrorBox';
import LoadingSpinner from '../../../../common/LoadingSpinner/LoadingSpinner';
import {useBoxOfficeList} from '../../../../hooks/useMainPage';
import './RankingLineStyle.css';
import {useEffect, useState} from 'react';
import RankingCard from '../RankingCard/RankingCard';
import {useNavigate} from 'react-router-dom';

const RankingLine = () => {
  const today = new Date();
  const todayDate = `${today.getFullYear()}${today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1}${
    today.getDate() < 10 ? '0' + today.getDate() : today.getDate()
  }`;
  // console.log(todayDate);

  const categoryFilterName = [
    {name: '콘서트', code: 'CCCD'},
    {name: '뮤지컬', code: 'GGGA'},
    {name: '클래식', code: 'CCCA'},
    {name: '연극', code: 'AAAA'},
    {name: '아동', code: 'KID'},
  ];
  const [selectedCategory, setSelectedCategory] = useState('CCCD');
  const [slicedData, setSlicedData] = useState([]);
  // console.log(selectedCategory);

  // const {data, isLoading, isError, error} = useBoxOfficeList('day', todayDate, selectedCategory);
  const {data, isLoading, isError, error} = useBoxOfficeList('week', todayDate, selectedCategory);
  // console.log('Ranking Data:', data);
  // console.log('Ranking error:', error);
  // console.log(selectedCategory);

  const navigate = useNavigate();

  useEffect(() => {
    setSlicedData(data?.slice(0, 5));
  }, [data]);
  // console.log('slicedData:', slicedData);

  // if (isLoading) {
  //   return <LoadingSpinner />;
  // }
  if (isError) {
    return <ErrorBox error={error} />;
  }
  return (
    <div className="ranking-line-container mt-5">
      <h2 className="contents-line-title text-center fw-bold mb-3">순위</h2>
      <div className="filter-btn-box d-flex flex-wrap justify-content-center gap-xxl-5 gap-xl-4 gap-3 ">
        {categoryFilterName.map((filter, i) => (
          <button
            key={i}
            className={`filter-btn rounded-5 fs-5 ${filter.code === selectedCategory ? 'active' : ''}`}
            onClick={() => setSelectedCategory(filter.code)}>
            {filter.name}
          </button>
        ))}
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="ranking-card-container my-4">
          {slicedData?.map((item, i) => (
            <RankingCard key={i} item={item} />
          ))}
        </div>
      )}
      <button className="show-all-btn mx-auto d-block rounded-4 fs-4 fw-bold" onClick={() => navigate('/ranking')}>
        순위 전체 보기
      </button>
    </div>
  );
};
export default RankingLine;
