import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ImportantQuestionsList() {
  const [importantQuestions, setImportantQuestions] = useState([]);

  const getImportantQuestions = async () => {
    try {
      const { data, status } = await axios.get(
        'http://localhost:1337/api/importants'
      );

      if (status === 200) {
      }
      console.log('중요 데이터', data.data);
    } catch (error) {
      console.log('Important Questions List Error', error.message);
    }
  };

  useEffect(() => {
    getImportantQuestions();
  }, []);

  return (
    <>
      <div>중요 질문 페이지</div>
    </>
  );
}
