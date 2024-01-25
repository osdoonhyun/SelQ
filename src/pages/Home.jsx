import { useCallback, useEffect, useState } from 'react';
import { useGetQuestionsByCategory } from '../hooks/queries/useGetQuestionsByCategory';
import Question from '../components/question/Question';
import RandomQuestion from '../components/question/RandomQuestion';
import Hint from '../components/Hint';
import Answer from '../components/Answer';
import { shuffle } from '../utils/shuffle';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [randomQuestion, setRandomQuestion] = useState({});

  const { data: questions } = useGetQuestionsByCategory({
    category: selectedCategory,
  });

  const getRandomQuestion = useCallback(() => {
    if (questions && questions.length > 0) {
      // Fisher-Yates shuffle
      const shuffledQuestions = shuffle(questions);
      const randomIndex = Math.floor(Math.random() * questions.length);

      setRandomQuestion(shuffledQuestions[randomIndex]);
    }
  }, [questions]);

  const handleDropdownCategorySelect = useCallback((eventKey) => {
    setSelectedCategory(eventKey);
  }, []);

  useEffect(() => {
    if (questions) {
      getRandomQuestion();
    }
  }, [questions]);

  return (
    <div className='d-flex flex-column'>
      <RandomQuestion
        selectedCategory={selectedCategory}
        getNextQuestion={getRandomQuestion}
        onSelect={handleDropdownCategorySelect}
      />
      <Question question={randomQuestion}>
        <Hint hints={randomQuestion?.hints} />
        <Answer answers={randomQuestion?.answers} />
      </Question>
    </div>
  );
}
