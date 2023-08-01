import { Container, Nav, Navbar } from 'react-bootstrap';
import FormContainer from './FormContainer';
import { FontSizeSettings } from './ui/FontSizeSettings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faList } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';

export default function Header() {
  return (
    <FormContainer>
      <Navbar className='bg-body-tertiary'>
        <Container>
          <Navbar.Brand
            href='/'
            style={{ fontSize: '26px', fontWeight: '600' }}
          >
            Sel-Q
          </Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link
              href='/home'
              className='d-flex flex-column align-items-center'
            >
              <FontAwesomeIcon icon={faHouse} size='xl' />
              <span style={{ fontSize: '13px', marginTop: '8px' }}>홈</span>
            </Nav.Link>
            <Nav.Link
              href='/questions'
              className='d-flex flex-column align-items-center'
            >
              <FontAwesomeIcon icon={faList} size='xl' />
              <span style={{ fontSize: '13px', marginTop: '8px' }}>
                질문목록
              </span>
            </Nav.Link>
            <Nav.Link
              href='/importants'
              className='d-flex flex-column align-items-center'
            >
              <FontAwesomeIcon icon={faBookmark} size='xl' />
              <span style={{ fontSize: '13px', marginTop: '8px' }}>
                중요질문
              </span>
            </Nav.Link>
          </Nav>
          <Nav className='ml-auto'>
            <FontSizeSettings />
          </Nav>
        </Container>
      </Navbar>
    </FormContainer>
  );
}
