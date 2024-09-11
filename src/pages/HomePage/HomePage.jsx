import {Card} from 'react-bootstrap';
import './HomePageStyle.css';

const HomePage = () => {
  return (
    <div className="homepage-container container">
      <Card style={{width: '18rem'}}>
        <Card.Img variant="top" src="http://www.kopis.or.kr/upload/pfmPoster/PF_PF248732_240910_125126.png" />
        <Card.Body>
          <Card.Title className="card-title">Card Title</Card.Title>
          <Card.Text>Some quick example text to build on the card title and make up the bulk of the card&apos;s content.</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default HomePage;
