import { Col, Container, Row } from 'react-bootstrap';

export default function FormContainer({ children }) {
  return (
    <Container style={{ maxWidth: '390px', margin: 'auto' }}>
      <Row>
        <Col>{children}</Col>
      </Row>
    </Container>
  );
}
