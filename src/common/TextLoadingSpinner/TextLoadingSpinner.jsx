import {Container, Spinner} from 'react-bootstrap';
import './TextLoadingSpinnerStyle.css';

const TextLoadingSpinner = () => {
  return (
    <Container className="text-spinner-container">
      <h3>잠시만 기다려주세요</h3>
      {/* <img src={SpinnerImage} alt='로딩' className='spinner-image' /> */}
      <Spinner animation="border" role="status" className="spinner" />
    </Container>
  );
};
export default TextLoadingSpinner;
