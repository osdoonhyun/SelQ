import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import GoBackButton from '../components/ui/GoBackButton';
import ImportanceCount from '../components/ImportanceCount';
import { useFontSize } from '../components/context/FontSizingProvider';
import Answer from '../components/common/Answer';
import Hint from '../components/common/Hint';
import { QuestionQ, QuestionTitle } from '../styles/Styles';
import { useQuestionDetailQuery } from '../services/api';

export default function QuestionDetail() {
  const { fontSizing, calcFontSize } = useFontSize();
  const { questionId } = useParams();
  const { data: question } = useQuestionDetailQuery(questionId);

  return (
    <>
      <GoBackButton />
      <div
        style={{
          display: 'flex',
          backgroundColor: 'white',
          flexDirection: 'column',
        }}
      >
        <Row>
          <Col>
            <QuestionQ size={calcFontSize('1.8rem', fontSizing)}>Q.</QuestionQ>
          </Col>
          <Col className='d-flex justify-content-end align-items-center'>
            {/* <ImportanceCount
              importance={
                question?.importants?.data[0]?.attributes.importantLevel
              }
              importanceId={question?.importants?.data[0]?.id}
              questionId={question.id}
            /> */}
          </Col>
        </Row>
        <QuestionTitle size={calcFontSize('1.6rem', fontSizing)}>
          {question?.question}
        </QuestionTitle>
        <Fragment key={question?.id}>
          <Hint hints={question?.hints} />
          <Answer answers={question?.answers} />
        </Fragment>
      </div>
    </>
  );
}
