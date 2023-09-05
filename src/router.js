import Home from './pages/Home';
import Questions from './pages/Questions';
import ImportantQuestionsList from './pages/ImportantQuestionsList';
import QuestionDetail from './pages/QuestionDetail';
import { createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root';
import SignUp from './pages/auth/SignUp';
import LogIn from './pages/auth/LogIn';
import ResetPassword from './pages/resetPassword/ResetPassword';
import RegisterQuestionForm from './pages/postingQuestion/RegisterQuestionForm';
import UsersManagement from './pages/UserManagement';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: '/questions', element: <Questions /> },
      { path: '/questions/:questionId', element: <QuestionDetail /> },
      { path: '/importants', element: <ImportantQuestionsList /> },
      { path: '/importants/:questionId', element: <QuestionDetail /> },
      { path: '/password/new', element: <ResetPassword /> },
      { path: '/admin/post/question', element: <RegisterQuestionForm /> },
      { path: '/admin/users', element: <UsersManagement /> },
    ],
  },
  { path: '/login', element: <LogIn /> },
  { path: '/signup', element: <SignUp /> },
]);
