import {Alert, Container} from 'react-bootstrap';

const ErrorBox = (error) => {
  return (
    <Container>
      <Alert variant="danger" className="w-50 mx-auto my-5">
        <Alert.Heading className="text-center">Error</Alert.Heading>
        <p className="fs-2">{error.message}</p>
      </Alert>
    </Container>
  );
};
export default ErrorBox;
