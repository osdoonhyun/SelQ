import { Link, useLocation } from 'react-router-dom';
const { Offcanvas, Nav } = require('react-bootstrap');

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

const NavItem = ({ href, text }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = isPathMatch(href, currentPath);

  return (
    <Nav.Link as={Link} to={href}>
      <span
        style={{ fontSize: '13px', color: isActive ? '#5BACEE' : '#B3B3B5' }}
      >
        {text}
      </span>
    </Nav.Link>
  );
};
export default function MenuOffcanvas({ show, onHide }) {
  return (
    <Offcanvas show={show} onHide={onHide}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Sel-Q</Offcanvas.Title>
        <Nav.Link href='/login'>로그인</Nav.Link>
        <Nav.Link href='/signup'>회원가입</Nav.Link>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <NavItem href='/' text='홈' />
        <NavItem href='/questions' text='질문목록' />
        <NavItem href='/importants' text='중요질문' />
      </Offcanvas.Body>
    </Offcanvas>
  );
}
