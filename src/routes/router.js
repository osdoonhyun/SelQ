import Home from '../pages/Home';
import CategoryQuestions from '../pages/CategoryQuestions';
import ImportantQuestionsList from '../pages/ImportantQuestions';
import QuestionDetail from '../pages/QuestionDetail';
import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import SignUp from '../pages/SignUp';
import LogIn from '../pages/LogIn';
import ResetPassword from '../pages/ResetPassword';
import PostingQuestion from '../pages/PostingQuestion';
import MyPage from '../pages/MyPage';
import UsersManagement from '../pages/UserManagement';
import EditQuestion from '../pages/EditQuestion';
import BookmarkedQuestions from '../pages/BookmarkedQuestions';
import QuestionManagement from '../pages/QuestionManagement';
import SocialSignUp from '../components/SocialSignUp';
import NotFoundPage from '../pages/NotFoundPage';
import PrivateRoute from './PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Home /> },
      { path: '/questions', element: <CategoryQuestions /> },
      { path: '/questions/:questionId', element: <QuestionDetail /> },
      { path: '/importants', element: <ImportantQuestionsList /> },
      { path: '/importants/:questionId', element: <QuestionDetail /> },
      { path: '/bookmarks', element: <BookmarkedQuestions /> },
      { path: '/bookmarks/:questionId', element: <QuestionDetail /> },
      { path: '/password/new', element: <ResetPassword /> },
      { path: '/user', element: <MyPage /> },
      { path: '/signup/social', element: <SocialSignUp /> },
    ],
  },
  {
    path: '/admin',
    element: <Root />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'post/question',
        element: (
          <PrivateRoute isOnlyAdminAllowed>
            <PostingQuestion />
          </PrivateRoute>
        ),
      },
      {
        path: 'edit/question/:questionId',
        element: (
          <PrivateRoute isOnlyAdminAllowed>
            <EditQuestion />
          </PrivateRoute>
        ),
      },
      {
        path: 'users',
        element: (
          <PrivateRoute isOnlyAdminAllowed>
            <UsersManagement />
          </PrivateRoute>
        ),
      },
      {
        path: 'questions',
        element: (
          <PrivateRoute isOnlyAdminAllowed>
            <QuestionManagement />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: '/login', element: <LogIn /> },
  { path: '/signup', element: <SignUp /> },
]);
