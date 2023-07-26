import './App.css';
import Header from './components/Header';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import FormContainer from './components/FormContainer';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import FontSizingProvider from './components/context/FontSizingProvider';

function App() {
  return (
    <>
      <Container
        style={{
          height: 'auto',
          minHeight: '100vh',
          paddingBottom: '60px',
        }}
      >
        <FontSizingProvider>
          <Header />
          <FormContainer>
            <RouterProvider router={router} />
          </FormContainer>
        </FontSizingProvider>
      </Container>
      <Footer />
    </>
  );
}

export default App;
