import { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { GREYS } from '../../styles/variables';
import { NextButton } from '../../styles/ButtonStyles';
import RequiredLabel from '../../components/RequiredLabel';

export default function AnswerInput({ question, onNext }) {
  const [answers, setAnswers] = useState('');

  const postingAnswer = (e) => {
    e.preventDefault();

    onNext({ answers });
  };

  return (
    <Container>
      <Form onSubmit={postingAnswer}>
        <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
          <Form.Label>
            질문
            <RequiredLabel />
          </Form.Label>
          <div style={{ color: GREYS.DARKEST }}>
            <ReactMarkdown children={question} />
          </div>
        </Form.Group>

        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
          <Form.Label>
            답변
            <RequiredLabel />
          </Form.Label>
          <Form.Control
            style={{ height: '150px' }}
            as='textarea'
            type='text'
            placeholder='답변을 등록하세요.'
            value={answers}
            onChange={(e) => setAnswers(e.target.value)}
          />
        </Form.Group>

        <NextButton disabled={!answers} type='submit'>
          다음
        </NextButton>
      </Form>
    </Container>
  );
}
