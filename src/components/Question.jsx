import { Badge, Button, Container, Stack } from 'react-bootstrap';
import Hint from './Hint';
import Answer from './Answer';
import { Fragment } from 'react';

export default function Question({
  questionId,
  question,
  description,
  onGetAnswer,
}) {
  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: 'white',
        flexDirection: 'column',
      }}
    >
      <div style={{ fontSize: '1.8rem', fontWeight: '500' }}>Q.</div>
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
        <Hint hints={question?.attributes?.hint} />
        <Answer description={description} onGetAnswer={onGetAnswer} />
      </Fragment>
    </div>
  );
}
