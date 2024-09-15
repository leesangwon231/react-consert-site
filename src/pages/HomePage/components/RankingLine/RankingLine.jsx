import {Button} from 'react-bootstrap';
import ErrorBox from '../../../../common/ErrorBox/ErrorBox';
import LoadingSpinner from '../../../../common/LoadingSpinner/LoadingSpinner';
import {useBoxOfficeList} from '../../../../hooks/useMainPage';
import './RankingLineStyle.css';
import {useEffect, useState} from 'react';
import RankingCard from '../RankingCard/RankingCard';

const dummyItem = {
  prfplcnm: '인스파이어리조트 아레나',
  seatcnt: '15000',
  rnum: '33',
  poster: '/upload/pfmPoster/PF_PF248830_240910_170939.jfif',
  prfpd: '2024.12.07~2024.12.08',
  mt20id: 'PF248830',
  prfnm: 'YOASOBI ASIA TOUR, LIVE IN KOREA',
  cate: '대중음악',
  prfdtcnt: '0',
  area: '인천',
};

const RankingLine = () => {
  // const today = new Date();
  // const todayDate = `${today.getFullYear()}${today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1}${
  //   today.getDate() < 10 ? '0' + today.getDate() : today.getDate()
  // }`;
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
  console.log(selectedCategory);

  // const {data, isLoading, isError, error} = useBoxOfficeList('day', todayDate, selectedCategory);
  const {data, isLoading, isError, error} = useBoxOfficeList('month', selectedCategory);
  console.log("Ranking Data:", data);
  console.log("Ranking error:", error);
  
  console.log(selectedCategory);
  useEffect(() => {
    setSlicedData(data?.slice(5));
    console.log(slicedData);
  }, [data]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <ErrorBox error={error} />;
  }
  return (
    <div className="ranking-line-container mt-5">
      <h2 className="contents-line-title text-center fw-bold mb-3">순위</h2>
      <div className="filter-btn-box d-flex flex-wrap justify-content-center gap-xxl-5 gap-xl-4 gap-3 ">
        {categoryFilterName.map((filter, i) => (
          <Button
            key={i}
            className={`filter-btn ${filter.name === selectedCategory ? 'active' : ''}`}
            onClick={() => setSelectedCategory(filter.code)}>
            {filter.name}
          </Button>
        ))}
      </div>
      <div className="ranking-card-container mt-4">
        {/* {slicedData?.map((item, i) => (
          <RankingCard key={i} item={item} />
          ))} */}
        <RankingCard item={dummyItem}></RankingCard>
        <RankingCard item={dummyItem}></RankingCard>
        <RankingCard item={dummyItem}></RankingCard>
        <RankingCard item={dummyItem}></RankingCard>
        <RankingCard item={dummyItem}></RankingCard>
      </div>
    </div>
  );
};
export default RankingLine;
