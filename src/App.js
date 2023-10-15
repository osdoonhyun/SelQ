import { router } from './routes/router';
import FontSizingProvider from './context/FontSizingProvider';
import LayoutContainer from './components/common/LayoutContainer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { CookiesProvider } from 'react-cookie';
import { GoogleOAuthProvider } from '@react-oauth/google';

const client = new QueryClient();

function App() {
  return (
    <LayoutContainer>
      <FontSizingProvider>
        <QueryClientProvider client={client}>
          <CookiesProvider>
            <Provider store={store}>
              <GoogleOAuthProvider
                clientId='576753327119-i9c1nu641mopb30hu7lhrncv0fa4oknn.apps.googleusercontent.com'
                // clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_KEY}
              >
                <RouterProvider router={router} />
              </GoogleOAuthProvider>
            </Provider>
            <ReactQueryDevtools initialIsOpen={false} />
          </CookiesProvider>
        </QueryClientProvider>
      </FontSizingProvider>
    </LayoutContainer>
  );
}

export default App;
