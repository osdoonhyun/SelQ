import { useEffect, useState } from 'react';
import axios from 'axios';
import { CATEGORIES } from '../constant/constants';
import { Badge, Button } from 'react-bootstrap';
import CustomBadge from '../components/ui/CustomBadge';
import { calcFontSize } from '../components/ui/FontSizeSettings';

export default function Questions() {
  const [fontSizeSetting, setFontSizeSetting] = useState('');
  const [questions, setQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const getQuestions = async () => {
    try {
      const { data, status } = await axios.get(
        'http://localhost:1337/api/questions'
      );

      if (status === 200) {
        console.log('전체 질문목록', data.data);
        setQuestions(data.data);
      }
    } catch (error) {
      console.log('Get Question Error', error.message);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredQuestions = questions.filter(
    (question) =>
      selectedCategory === 'All' ||
      question.attributes.category === selectedCategory
  );

  useEffect(() => {
    const savedFontSize = localStorage.getItem('fontSizeSetting');
    if (savedFontSize) {
      setFontSizeSetting(savedFontSize);
    }
    console.log('실행됨');
  }, [fontSizeSetting]);

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <>
      {CATEGORIES.map((category, index) => (
        <Button
          key={index}
          onClick={() => handleCategoryClick(category)}
          variant='outline-dark'
        >
          {category} <Badge bg='secondary'>{category.length}</Badge>
        </Button>
      ))}
      {filteredQuestions.map((question) => (
        <div key={question.id} style={{ margin: '2rem 0 3rem' }}>
          <div
            style={{
              fontSize: calcFontSize('1.8rem', fontSizeSetting),
              fontWeight: '500',
            }}
          >
            Q.
          </div>
          <div
            style={{
              fontSize: calcFontSize('1.6rem', fontSizeSetting),
              fontWeight: '500',
              lineHeight: 1.2,
              marginBottom: '0.5rem',
              letterSpacing: '0.05rem',
            }}
          >
            {question.attributes?.title}
          </div>
          <CustomBadge text={question.attributes?.category} />
        </div>
      ))}
      {/* TODO:아래와 같이 리팩토링 계획(콜백함수의 인자 객체 구조분해할당)
      {filteredQuestions.map(({id, ...question}) => (
        <Question key={id} {...question} /> 
      ))} */}
    </>
  );
}
