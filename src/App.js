import { router } from './router';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import FontSizingProvider from './components/context/FontSizingProvider';
import ContentContainer from './components/common/ContentContainer';
import LayoutContainer from './components/common/LayoutContainer';

function App() {
  return (
    <LayoutContainer>
      <FontSizingProvider>
        <Header />
        <ContentContainer router={router} />
        <Footer />
      </FontSizingProvider>
    </LayoutContainer>
  );
}

export default App;
