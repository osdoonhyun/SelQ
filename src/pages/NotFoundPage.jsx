import Logo from '../assets/image/sel-q-logo.png';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import { MAIN } from '../styles/variables';

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <div
        style={{
          width: '100%',
          padding: '10px',
          minHeight: 'calc(100vh - 150px)',
          maxWidth: '1080px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '150px',
          }}
        >
          <Image
            src={Logo}
            alt={'selQ-Logo'}
            style={{ width: '100px', height: '100px' }}
          />
          <h2 className='mt-3'>해당 페이지를 찾지 못했습니다.</h2>
          <div>
            <Link
              style={{
                textDecoration: 'none',
                fontSize: '1.5rem',
                color: MAIN.MEDIUM,
              }}
              to='/'
            >
              홈으로 이동하기
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
