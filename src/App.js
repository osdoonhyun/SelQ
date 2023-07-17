import './App.css';
import Header from './components/Header';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import FormContainer from './components/FormContainer';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <FormContainer>
        <RouterProvider router={router} />
      </FormContainer>
      <Footer />
    </>
  );
}

export default App;
