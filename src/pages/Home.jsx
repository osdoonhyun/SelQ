import axios from 'axios';
import { useEffect, useState } from 'react';
import Question from '../components/Question';
import RandomQuestion from '../components/RandomQuestion';

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [nextQuestion, setNextQuestion] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');

  const getQuestions = async () => {
    try {
      const { data, status } = await axios.get(
        'http://localhost:1337/api/questions'
      );

      if (status === 200) {
        setQuestions(data.data);
        setNextQuestion(getRandomQuestion(data.data, data.data.length));
      }
    } catch (error) {
      console.log('Get Question Error', error.message);
    }
  };

  const getNextQuestion = (category) => {
    let randomQuestions = [...questions];
    if (category !== 'All') {
      randomQuestions = questions.filter(
        (question) => question.attributes.category === category
      );
    }

    const numberOfQuestions = randomQuestions.length;
    const randomQuestion = getRandomQuestion(questions, numberOfQuestions);

    setNextQuestion(randomQuestion);
  };

  const getRandomQuestion = (questions, count) => {
    const randomIndex = Math.floor(Math.random() * count);
    return questions[randomIndex];
  };

  const handleDropdownCategorySelect = (eventKey) => {
    console.log('이벤트클릭', eventKey);
    setSelectedCategory(eventKey);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <>
      <RandomQuestion
        getNextQuestion={getNextQuestion}
        selectedCategory={selectedCategory}
        onSelect={handleDropdownCategorySelect}
      />
      <Question questionId={nextQuestion.id} question={nextQuestion} />
    </>
  );
}
