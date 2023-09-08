import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

export default function PostAnswer({ question, onNext }) {
  const [answers, setAnswers] = useState('');

  const postingAnswer = (e) => {
    e.preventDefault();

    onNext({ answers });
  };

  return (
    <Container>
      <Form onSubmit={postingAnswer}>
        <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
          <Form.Label>질문</Form.Label>
          <ReactMarkdown children={question} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
          <Form.Label>답변</Form.Label>
          <Form.Control
            type='textarea'
            placeholder='답변을 등록하세요.'
            value={answers}
            onChange={(e) => setAnswers(e.target.value)}
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          다음
        </Button>
      </Form>
    </Container>
  );
}
