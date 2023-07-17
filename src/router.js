import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Questions from './pages/Questions';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/questions',
    element: <Questions />,
  },
]);

export default router;
