import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import FontSizeSettings from '../ui/FontSizeSettings';
import { faHouse, faList, faBars } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { HeaderIcon, HeaderNav } from '../../styles/Styles';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from '../ui/SearchBar';
import MenuOffcanvas from './MenuOffcanvas';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function isPathMatch(targetPath, currentPath) {
  if (targetPath === '/') {
    return currentPath === '/';
  }

  const cleanTargetPath = targetPath.endsWith('/')
    ? targetPath.slice(0, -1)
    : targetPath;
  const cleanCurrentPath = currentPath.endsWith('/')
    ? currentPath.slice(0, -1)
    : currentPath;
  return cleanCurrentPath.startsWith(cleanTargetPath);
}

const NavItem = ({ href, icon, text }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = isPathMatch(href, currentPath);

  return (
    <Nav.Link as={Link} to={href}>
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
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);

  return (
    <>
      <Navbar style={{ backgroundColor: '#F7F6F7' }} className='bg-body-light'>
        <Container>
          <Navbar.Brand
            as={Link}
            to='/'
            style={{ fontSize: '26px', fontWeight: '600', color: '#5bacee' }}
          >
            Sel-Q
          </Navbar.Brand>
          <HeaderNav className='me-auto'>
            <Button onClick={handleShowOffcanvas} variant='light'>
              <FontAwesomeIcon color='#B3B3B5' icon={faBars} size='xl' />
            </Button>
            <NavItem href='/' icon={faHouse} text='홈' />
            <NavItem href='/questions' icon={faList} text='질문목록' />
            <NavItem href='/importants' icon={faBookmark} text='중요질문' />
          </HeaderNav>
          <Nav className='ml-auto'>
            <SearchBar />
            <FontSizeSettings />
          </Nav>
        </Container>
      </Navbar>

      <MenuOffcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} />
    </>
  );
}
