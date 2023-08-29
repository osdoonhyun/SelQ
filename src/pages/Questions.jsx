import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { CATEGORIES } from '../constant/constants';
import { Badge, Button } from 'react-bootstrap';
import CustomBadge from '../components/ui/CustomBadge';
import { LinkContainer } from 'react-router-bootstrap';
import CategoryCarousel from '../components/ui/CategoryCarousel';
import { useFontSize } from '../components/context/FontSizingProvider';
import { QuestionQ, QuestionTitle } from '../styles/Styles';
import { useQuestionsQuery } from '../services/api';

export default function Questions() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { fontSizing, calcFontSize } = useFontSize();

  const { data: questions } = useQuestionsQuery({ category: selectedCategory });

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredQuestions = questions?.filter(
    (question) =>
      selectedCategory === 'all' || question.category === selectedCategory
  );

  return (
    <>
      <CategoryCarousel
        questions={questions}
        onClickCategory={handleCategoryClick}
        selectedCategory={selectedCategory}
      />

      {filteredQuestions?.map((question, index) => (
        <Fragment key={question.id}>
          <LinkContainer to={`/questions/${question.id}`}>
            <div>
              <QuestionQ
                style={{
                  marginTop: index === 0 ? '20px' : '70px',
                }}
                size={calcFontSize('1.8rem', fontSizing)}
                cursor={'pointer'}
              >
                Q.
              </QuestionQ>
              <QuestionTitle
                size={calcFontSize('1.6rem', fontSizing)}
                mb='0.5rem'
                cursor={'pointer'}
              >
                {question.question}
              </QuestionTitle>
            </div>
          </LinkContainer>
          <CustomBadge
            last={index === filteredQuestions.length - 1}
            text={question.category}
            onClickCategory={handleCategoryClick}
          />
        </Fragment>
      ))}
      {/* TODO:아래와 같이 리팩토링 계획(콜백함수의 인자 객체 구조분해할당)
      {filteredQuestions.map(({id, ...question}) => (
        <Question key={id} {...question} /> 
      ))} */}
    </>
  );
}
