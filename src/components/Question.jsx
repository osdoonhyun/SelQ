import { Badge, Button, Col, Container, Row, Stack } from 'react-bootstrap';
import Hint from './Hint';
import Answer from './Answer';
import { Fragment } from 'react';
import ImportantQuestion from './ui/ImportantQuestion';

export default function Question({
  questionId,
  question,
  description,
  hints,
  onGetAnswer,
  onGetHints,
}) {
  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: 'white',
        flexDirection: 'column',
      }}
    >
      <Row className='d-flex justify-content-between'>
        <Col>
          <div style={{ fontSize: '1.8rem', fontWeight: '500' }}>Q.</div>
        </Col>
        <Col className='text-end'>
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
      <div
        style={{
          fontSize: '1.6rem',
          fontWeight: '500',
          lineHeight: 1.2,
          letterSpacing: '0.05rem',
        }}
      >
        {question?.attributes?.title}
      </div>
      <Fragment key={questionId}>
        <Hint hints={hints} onGetHints={onGetHints} />
        <Answer description={description} onGetAnswer={onGetAnswer} />
      </Fragment>
    </div>
  );
}
