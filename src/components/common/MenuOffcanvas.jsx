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
        {/* {userInfo ? (
          //로그인 관리자
          userInfo.roles[0] === 'admin' ? (
            <>
              <Nav.Link href='/admin/post/question'>질문 등록</Nav.Link>
              <Nav.Link href='/admin/users'>유저 관리</Nav.Link>
            </>
          ) : (
            // 로그인 일반유저
            <Nav.Link className='d-inline-block' href='/user'>
              마이페이지
            </Nav.Link>
          )
        ) : (
          // 비로그인 시 */}
        <>
          <Nav.Link href='/login'>로그인</Nav.Link>
          <Nav.Link href='/signup'>회원가입</Nav.Link>
        </>
        {/* )} */}
      </Offcanvas.Header>
      <Offcanvas.Body>
        <NavItem href='/' text='홈' />
        <NavItem href='/questions' text='질문목록' />
        <NavItem href='/importants' text='중요질문' />
        <NavItem href='/importants' text='북마크' />
      </Offcanvas.Body>
    </Offcanvas>
  );
}
