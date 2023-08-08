import { Container, Nav, Navbar } from 'react-bootstrap';
import FormContainer from './FormContainer';
import { FontSizeSettings } from './ui/FontSizeSettings';
import { faHouse, faList } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { HeaderIcon, HeaderNav } from '../styles/ButtonStyles';
import { useLocation } from 'react-router-dom';

const NavItem = ({ href, icon, text }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = currentPath === href;

  return (
    <Nav.Link href={href}>
      <HeaderIcon icon={icon} size='xl' $isActive={isActive} />
      <span
        style={{ fontSize: '13px', color: isActive ? '#5BACEE' : '#B3B3B5' }}
      >
        {text}
      </span>
    </Nav.Link>
  );
};

export default function Header() {
  return (
    <FormContainer>
      <Navbar style={{ backgroundColor: '#F7F6F7' }} className='bg-body-light'>
        <Container>
          <Navbar.Brand
            href='/'
            style={{ fontSize: '26px', fontWeight: '600', color: '#5bacee' }}
          >
            Sel-Q
          </Navbar.Brand>
          <HeaderNav className='me-auto'>
            <NavItem href='/home' icon={faHouse} text='홈' />
            <NavItem href='/questions' icon={faList} text='질문목록' />
            <NavItem href='/importants' icon={faBookmark} text='중요질문' />
          </HeaderNav>
          <Nav className='ml-auto'>
            <FontSizeSettings />
          </Nav>
        </Container>
      </Navbar>
    </FormContainer>
  );
}
