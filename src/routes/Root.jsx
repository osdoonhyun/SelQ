import { Outlet } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';

export default function Root() {
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
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
