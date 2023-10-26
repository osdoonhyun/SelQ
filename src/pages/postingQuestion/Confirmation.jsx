import {
  Badge,
  Button,
  Container,
  Form,
  Spinner,
  Stack,
} from 'react-bootstrap';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { MAIN, GREYS } from '../../styles/variables';

export default function Confirmation({
  question,
  answer,
  isLoading,
  error,
  onNext,
}) {
  const onClickNext = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <Container>
      <Form onSubmit={onClickNext}>
        <Form.Group className='mb-3' controlId='form.ControlQuestion'>
          <Form.Label>질문</Form.Label>
          <div style={{ color: GREYS.DARKEST, minHeight: '50px' }}>
            <ReactMarkdown children={question.question} />
          </div>
        </Form.Group>
        <Form.Group className='mb-4' controlId='form.ControlImportance'>
          <Stack direction='horizontal' gap={5}>
            <div className='d-flex flex-column'>
              <Form.Label>카테고리</Form.Label>
              <span style={{ color: GREYS.DARKEST }}>{question.category}</span>
            </div>
            <div className='d-flex flex-column align-items-center'>
              <Form.Label>중요도</Form.Label>
              <span style={{ color: GREYS.DARKEST }}>
                {question.importance}
              </span>
            </div>
          </Stack>
        </Form.Group>

        <Form.Group className='mb-4' controlId='form.ControlHint'>
          <div className='d-flex flex-column'>
            <Form.Label>힌트</Form.Label>
            <div className='d-flex flex-wrap'>
              {question.hints?.map((hint, index) => (
                <Badge
                  bg={MAIN.MEDIUM}
                  style={{
                    fontSize: '0.8rem',
                    color: GREYS.LIGHTER,
                    letterSpacing: '0.1rem',
                    backgroundColor: MAIN.MEDIUM,
                  }}
                  key={index}
                  className='d-flex justify-content-center align-items-center mx-1'
                >
                  {hint}
                </Badge>
              ))}
            </div>
          </div>
        </Form.Group>
        <Form.Group className='mb-3' controlId='form.ControlAnswer'>
          <Form.Label>답변</Form.Label>
          <div style={{ color: GREYS.DARKEST, minHeight: '70px' }}>
            <ReactMarkdown children={answer.answers} />
          </div>
        </Form.Group>
        <Button
          variant='Light'
          type='submit'
          style={{
            backgroundColor: MAIN.DARK,
            border: `1px solid ${MAIN.DARK}`,
            color: GREYS.LIGHTER,
          }}
        >
          {isLoading ? (
            <div>
              <Spinner
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
              />
              <span className='visually-hidden'>Loading...</span>
            </div>
          ) : (
            '등록하기'
          )}
        </Button>
      </Form>
    </Container>
  );
}
