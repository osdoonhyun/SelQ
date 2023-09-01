import { Badge, Button, Container } from 'react-bootstrap';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

export default function RegisterQuestion({ question, answer, onNext }) {
  const onClick = () => {
    onNext();
  };

  return (
    <Container>
      <ReactMarkdown children={question.question} />
      중요도 : {question.importance}
      <br />
      카테고리 : {question.category}
      <br />
      힌트 :
      {question.hints?.map((hint, index) => (
        <Badge bg='primary' key={index}>
          {hint}
        </Badge>
      ))}
      <ReactMarkdown children={answer.answers} />
      <Button onClick={onClick}>등록하기</Button>
    </Container>
  );
}

// 전체 Question, Answer를 보여준다.
// 수정페이지 -> 수정하기 버튼
// 등록페이지 -> 등록하기 버튼
