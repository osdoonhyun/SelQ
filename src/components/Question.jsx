import { Badge, Button, Container, Stack } from 'react-bootstrap';
import Hint from './Hint';
import Answer from './Answer';

export default function Question({ question }) {
  console.log('질문!!!', question);

  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: 'white',
        // height: '640px',
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
      <Hint hints={question?.attributes?.hint} />
      <Answer description={question?.attributes?.description} />
    </div>
  );
}
