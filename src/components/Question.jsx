import { Badge, Button, Col, Container, Row, Stack } from 'react-bootstrap';
import Hint from './common/Hint';
import Answer from './common/Answer';
import { Fragment } from 'react';
import ImportantQuestion from './ImportanceCount';
import { useFontSize } from './context/FontSizingProvider';
import { QuestionQ, QuestionTitle } from '../styles/Styles';

export default function Question({ questionId, question, children }) {
  const { fontSizing, calcFontSize } = useFontSize();

  return (
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
          <ImportantQuestion
            importance={
              question?.attributes?.importants?.data[0]?.attributes
                ?.importantLevel
            }
            importanceId={question?.attributes?.importants?.data[0]?.id}
            questionId={questionId}
          />
        </Col>
      </Row>
      <QuestionTitle size={calcFontSize('1.6rem', fontSizing)}>
        {question?.attributes?.title}
      </QuestionTitle>
      <Fragment key={questionId}>{children}</Fragment>
    </div>
  );
}
