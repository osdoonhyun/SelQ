import Home from './pages/Home';
import Questions from './pages/Questions';
import ImportantQuestionsList from './pages/ImportantQuestionsList';
import QuestionDetail from './pages/QuestionDetail';

export const routes = [
  { path: '/', element: <Home /> },
  { path: '/home', element: <Home /> },
  { path: '/questions', element: <Questions /> },
  { path: '/questions/:questionId', element: <QuestionDetail /> },
  { path: '/importants', element: <ImportantQuestionsList /> },
  { path: '/importants/:questionId', element: <QuestionDetail /> },
];
