import { Col, Row } from 'react-bootstrap';
import { Fragment } from 'react';
import ImportanceCount from './ImportanceCount';
import { useFontSize } from '../context/FontSizingProvider';
import { QuestionQ, QuestionTitle } from '../styles/Styles';
import Bookmark from './ui/Bookmark';

export default function Question({ question, children }) {
  const { fontSizing, calcFontSize } = useFontSize();
  const { id, question: questionTitle, importance } = question;

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
        <Col className='d-flex align-items-end'>
          <QuestionQ size={calcFontSize('1.8rem', fontSizing)}>Q.</QuestionQ>
        </Col>
        <Col className='d-flex justify-content-end align-items-center'>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
              <ImportanceCount importance={importance} />
            </div>
            <div
              className='mx-1'
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '10px',
              }}
            >
              <Bookmark question={question} />
            </div>
          </div>
        </Col>
      </Row>
      <QuestionTitle size={calcFontSize('1.6rem', fontSizing)}>
        {questionTitle}
      </QuestionTitle>
      <Fragment>{children}</Fragment>
    </div>
  );
}
