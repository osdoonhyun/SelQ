import axios from 'axios';
import { useEffect, useState } from 'react';
import Question from '../components/Question';
import RandomQuestion from '../components/RandomQuestion';

export default function Home() {
  const [questions, setQuestions] = useState([]);

  const getQuestions = async () => {
    try {
      const { data, status } = await axios.get(
        'http://localhost:1337/api/questions'
      );

      if (status === 200) {
        setQuestions(data.data);
      }
    } catch (error) {
      console.log('Get Question Error', error.message);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <>
      {/* Home 입니다. */}
      {/* {data} */}
      <RandomQuestion />
      <Question />
    </>
  );
}
