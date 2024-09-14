import { Container } from 'react-bootstrap';
import Banner from './components/Banner/Banner';
import './HomePageStyle.css';
import MainContentsLine from './components/MainContentsLine/MainContentsLine';

const HomePage = () => {
  return (
    <div className="homepage-container py-4">
      <Banner />
      <Container>
        <MainContentsLine title="콘서트" genreCode="CCCD" kidState="N"/>
      </Container>
    </div>
  );
};

export default HomePage;
