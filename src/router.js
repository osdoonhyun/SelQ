import Home from './pages/Home';
import Questions from './pages/Questions';
import ImportantQuestionsList from './pages/ImportantQuestionsList';
import QuestionDetail from './pages/QuestionDetail';
import { createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root';
import SignUp from './pages/auth/SignUp';
import LogIn from './pages/auth/LogIn';
import ResetPassword from './pages/resetPassword/ResetPassword';
import PostingQuestionForm from './pages/postingQuestion/PostingQuestionForm';
import MyPage from './pages/MyPage';
import UsersManagement from './pages/UserManagement';
import EditQuestion from './pages/postingQuestion/EditQuestion';
import BookmarkedQuestions from './pages/BookmarkedQuestions';
import QuestionManagement from './pages/QuestionManagement';
import SocialSignUp from './components/common/SocialSignUp';

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
      { path: '/bookmarks', element: <BookmarkedQuestions /> },
      { path: '/password/new', element: <ResetPassword /> },
      { path: '/user', element: <MyPage /> },
      { path: '/signup/social', element: <SocialSignUp /> },

      { path: '/admin/post/question', element: <PostingQuestionForm /> },
      { path: '/admin/edit/question/:questionId', element: <EditQuestion /> },
      { path: '/admin/users', element: <UsersManagement /> },
      { path: '/admin/questions', element: <QuestionManagement /> },
    ],
  },
  { path: '/login', element: <LogIn /> },
  { path: '/signup', element: <SignUp /> },
]);
