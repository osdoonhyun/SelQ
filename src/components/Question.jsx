import { Badge, Button, Container, Stack } from 'react-bootstrap';
import Hint from './Hint';
import Answer from './Answer';

export default function Question() {
  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: 'white',
        height: '80vh',
        flexDirection: 'column',
      }}
    >
      {/* <div>category &gt; JavaScript</div> */}
      <div style={{ fontSize: '1.8rem', fontWeight: '500' }}>Q.</div>
      <div
        style={{
          fontSize: '1.6rem',
          fontWeight: '500',
          lineHeight: 1.2,
          letterSpacing: '0.05rem',
        }}
      >
        자바스크립트는 무슨 언어인가요?무슨자바스크립트는 무슨
        언어인가요?자바스크립트는 무슨 언어인가요?
      </div>
      <Hint />
      <Answer />
    </div>
  );
}
