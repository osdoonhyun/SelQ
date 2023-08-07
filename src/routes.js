import Home from './pages/Home';
import Questions from './pages/Questions';
import QuestionDetail from './components/QuestionDetail';
import ImportantQuestionsList from './components/ImportantQuestionsList';

export const routes = [
  { path: '/', element: <Home /> },
  { path: '/home', element: <Home /> },
  { path: '/questions', element: <Questions /> },
  { path: '/questions/:questionId', element: <QuestionDetail /> },
  { path: '/importants', element: <ImportantQuestionsList /> },
];
