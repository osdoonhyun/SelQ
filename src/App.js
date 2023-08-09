import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import Header from './components/Header';
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
          fontFamily: 'BMHANNAPro',
        }}
      >
        <FontSizingProvider>
          <BrowserRouter>
            <Header />
            <FormContainer>
              <Routes>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Routes>
            </FormContainer>
          </BrowserRouter>
        </FontSizingProvider>
      </Container>
      <Footer />
    </>
  );
}

export default App;
