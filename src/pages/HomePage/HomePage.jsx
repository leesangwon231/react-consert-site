import {Container} from 'react-bootstrap';
import Banner from './components/Banner/Banner';
import './HomePageStyle.css';
import MainContentsLine from './components/MainContentsLine/MainContentsLine';
import RankingLine from './components/RankingLine/RankingLine';

const HomePage = () => {
  return (
    <div className="homepage-container py-4">
      <Banner />
      <Container>
        <RankingLine />
        <MainContentsLine title="콘서트" genreCode="CCCD" kidState="N" />
        <MainContentsLine title="뮤지컬" genreCode="GGGA" kidState="N" />
        <MainContentsLine title="연극" genreCode="AAAA" kidState="N" />
        <MainContentsLine title="아동/가족" genreCode="" kidState="Y" />
        <MainContentsLine title="클래식" genreCode="CCCA" kidState="N" />
      </Container>
    </div>
  );
};

export default HomePage;
