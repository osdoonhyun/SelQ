import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { faHouse, faList, faBars } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';

import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from 'react-bootstrap';
import { HeaderIcon, HeaderNav } from '../../styles/Styles';
import SearchBar from '../ui/SearchBar';
import FontSizeSettings from '../ui/FontSizeSettings';
import MenuOffcanvas from './MenuOffcanvas';
import useGetProfileInfo from '../../services/authHook/getProfile';

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
      <HeaderIcon
        className='d-none d-md-block'
        icon={icon}
        size='xl'
        $isActive={isActive}
      />
      <span
        style={{ fontSize: '14px', color: isActive ? '#5BACEE' : '#B3B3B5' }}
      >
        {text}
      </span>
    </Nav.Link>
  );
};

export default function Header() {
  const { data: userInfo } = useGetProfileInfo();
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);
  return (
    <>
      <Container className='d-none d-md-block w-100'>
        <Row className='align-items-center'>
          <Col md={2}>
            <Navbar.Brand
              as={Link}
              to='/'
              style={{
                fontSize: '26px',
                fontWeight: '600',
                color: '#5bacee',
              }}
            >
              Sel-Q
            </Navbar.Brand>
          </Col>
          <Col className='d-flex' md={5}>
            <HeaderNav className='me-auto'>
              <NavItem href='/' icon={faHouse} text='홈' />
              <NavItem href='/questions' icon={faList} text='질문목록' />
              <NavItem href='/importants' icon={faBookmark} text='중요질문' />
              <NavItem href='/importants' icon={faBookmark} text='북마크' />
            </HeaderNav>
          </Col>
          <Col className='d-flex justify-content-end' md={5}>
            <SearchBar />
            {/* admin일 경우 글쓰기 버튼 추가
            로그인시 마이페이지 */}
            <Nav className='ml-auto'>
              {userInfo ? (
                // 로그인 했는데 admin
                userInfo.roles[0] === 'admin' ? (
                  <>
                    <Nav.Link
                      className='d-inline-block'
                      href='/admin/post/question'
                    >
                      질문 등록
                    </Nav.Link>
                    <Nav.Link className='d-inline-block' href='/admin/users'>
                      유저 관리
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link className='d-inline-block' href='/user'>
                      마이페이지
                    </Nav.Link>
                  </>
                )
              ) : (
                // 비로그인시
                <>
                  <Nav.Link className='d-inline-block' href='/login'>
                    로그인
                  </Nav.Link>
                  <Nav.Link className='d-inline-block' href='/signup'>
                    회원가입
                  </Nav.Link>
                </>
              )}
            </Nav>
            <FontSizeSettings />
          </Col>
        </Row>
      </Container>

      <div style={{ padding: '5px 10px' }} className='d-md-none'>
        <Row>
          <Col className='d-flex justify-content-start'>
            <Button onClick={handleShowOffcanvas} variant='light'>
              <FontAwesomeIcon color='#B3B3B5' icon={faBars} size='xl' />
            </Button>
          </Col>
          <Col>
            <Navbar.Brand
              as={Link}
              to='/'
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '5px 0',
                fontSize: '28px',
                fontWeight: '600',
                color: '#5bacee',
              }}
            >
              Sel-Q
            </Navbar.Brand>
          </Col>
          <Col className='d-flex justify-content-end'>
            <SearchBar />
          </Col>
        </Row>

        <Row>
          <Col>
            <HeaderNav
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
              className='me-auto'
            >
              <NavItem href='/' icon={faHouse} text='홈' />
              <NavItem href='/questions' icon={faList} text='질문목록' />
              <NavItem href='/importants' icon={faBookmark} text='중요질문' />
              <NavItem href='/importants' icon={faBookmark} text='북마크' />
            </HeaderNav>
          </Col>
        </Row>
      </div>

      <MenuOffcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} />
    </>
  );
}
