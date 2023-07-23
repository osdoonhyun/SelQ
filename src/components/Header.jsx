import { Container, Nav, Navbar } from 'react-bootstrap';
import FormContainer from './FormContainer';
import FontSizeSettings from './ui/FontSizeSettings';

export default function Header() {
  return (
    <FormContainer>
      <Navbar className='bg-body-tertiary'>
        <Container>
          <Navbar.Brand href='/'>Sel-Q</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link href='/home'>홈</Nav.Link>
            <Nav.Link href='/questions'>질문목록</Nav.Link>
          </Nav>
          <Nav className='ml-auto'>
            <FontSizeSettings />
          </Nav>
        </Container>
      </Navbar>
    </FormContainer>
  );
}
