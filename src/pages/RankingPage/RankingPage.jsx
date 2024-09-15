import {Container} from 'react-bootstrap';
import './RankingPageStyle.css';
import {useBoxOfficeList} from '../../hooks/useMainPage';
import {useState} from 'react';
import ErrorBox from '../../common/ErrorBox/ErrorBox';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import RankingCard from '../HomePage/components/RankingCard/RankingCard';

const categoryFilterName = [
  {name: '전체', code: ''},
  {name: '콘서트', code: 'CCCD'},
  {name: '뮤지컬', code: 'GGGA'},
  {name: '클래식', code: 'CCCA'},
  {name: '연극', code: 'AAAA'},
  {name: '아동', code: 'KID'},
  {name: '국악', code: 'CCCC'},
  {name: '서커스/마술', code: 'EEEB'},
];
const period = [
  {name: '일간', code: 'day'},
  {name: '주간', code: 'week'},
  {name: '월간', code: 'month'},
];

const RankingPage = () => {
  const today = new Date();
  const todayDate = `${today.getFullYear()}${today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1}${
    today.getDate() < 10 ? '0' + today.getDate() : today.getDate()
  }`;
  // console.log(todayDate - 1);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const {data, isLoading, isError, error} = useBoxOfficeList(selectedPeriod, todayDate - 1, selectedCategory);
  // console.log(data);

  // if (isLoading) {
  //   return <LoadingSpinner />;
  // }

  if (isError) {
    return <ErrorBox error={error} />;
  }
  return (
    <Container className="ranking-page-container">
      <h1 className="page-title">순위</h1>
      <ul className="period-button-box">
        {period.map((item, i) => (
          <li
            key={i}
            className={`period-filter-button fs-5 ${item.code === selectedPeriod ? 'active' : ''}`}
            onClick={() => setSelectedPeriod(item.code)}>
            {item.name}
          </li>
        ))}
      </ul>
      <ul className="filter-box">
        {categoryFilterName.map((filter, i) => (
          <li
            key={i}
            className={`ranking-filter-button border fs-5 ${filter.code === selectedCategory ? 'active' : ''}`}
            onClick={() => setSelectedCategory(filter.code)}>
            {filter.name}
          </li>
        ))}
      </ul>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="ranking-page-card-container">
          {data?.map((item, i) => (
            <RankingCard key={i} item={item} />
          ))}
        </div>
      )}
    </Container>
  );
};
export default RankingPage;
