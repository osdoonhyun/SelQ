import { Badge, Button, Col, Container, Row, Stack } from 'react-bootstrap';
import Hint from './common/Hint';
import Answer from './common/Answer';
import { Fragment } from 'react';
import ImportanceCount from './ImportanceCount';
import { useFontSize } from './context/FontSizingProvider';
import { QuestionQ, QuestionTitle } from '../styles/Styles';

export default function Question({
  question: { id, question, importance },
  children,
}) {
  const { fontSizing, calcFontSize } = useFontSize();

  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: 'white',
        flexDirection: 'column',
      }}
      key={id}
    >
      <Row>
        <Col>
          <QuestionQ size={calcFontSize('1.8rem', fontSizing)}>Q.</QuestionQ>
        </Col>
        <Col className='d-flex justify-content-end align-items-center'>
          <ImportanceCount importance={importance} />
        </Col>
      </Row>
      <QuestionTitle size={calcFontSize('1.6rem', fontSizing)}>
        {question}
      </QuestionTitle>
      <Fragment>{children}</Fragment>
    </div>
  );
}
