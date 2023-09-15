import { useNavigate, useParams } from 'react-router-dom';

import { Controller, set, useForm } from 'react-hook-form';
import {
  Badge,
  Button,
  CloseButton,
  Col,
  Container,
  Form,
  Row,
  Stack,
} from 'react-bootstrap';
import { useQuestionDetailQuery } from '../../services/api';
import { CATEGORIES } from '../../constant/constants';
import { useEditQuestion } from '../../services/questionHook/registerQuestion';
import { useEffect, useState } from 'react';

export default function EditQuestion() {
  const navigate = useNavigate();
  const { questionId } = useParams();
  const [newHint, setNewHint] = useState('');
  const [hints, setHints] = useState([]);
  const [editBtnDisable, setEditBtnDisable] = useState(true);

  const { data: question } = useQuestionDetailQuery(questionId);

  const { handleSubmit, register, getValues, control, watch, setValue } =
    useForm();

  const {
    mutateAsync: editQuestion,
    isLoading: loadingEdit,
    error: errorEdit,
  } = useEditQuestion();

  const handleAddHint = () => {
    if (newHint !== '') {
      setHints([...hints, newHint]);
      setValue('hints', hints);
      setNewHint('');
    }
  };

  const handleDeleteHint = (index) => {
    const updatedHints = [...hints];
    updatedHints.splice(index, 1);
    setHints(updatedHints);
    console.log('삭제됨', updatedHints);
  };

  const editQuestionHandler = () => {
    const updatedData = {};

    const questionValue = getValues('question');
    if (questionValue !== '' && questionValue !== question?.question) {
      updatedData.question = questionValue;
    }

    const categoryValue = getValues('category');
    if (categoryValue !== '' && categoryValue !== question?.category) {
      updatedData.category = categoryValue;
    }

    const importanceValue = getValues('importance');
    if (importanceValue !== '' && importanceValue !== question?.importance) {
      updatedData.importance = importanceValue;
    }

    const areArraysEqual =
      JSON.stringify(hints) !== JSON.stringify(question?.hints);
    if (areArraysEqual) {
      updatedData.hints = [...hints];
    }

    console.log('UPDATEDDATA', updatedData);
  };

  useEffect(() => {
    if (question?.hints) {
      setHints(question.hints);
    }
  }, [question?.hints]);

  return (
    <Container>
      <Form onSubmit={handleSubmit(editQuestionHandler)}>
        <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
          <Form.Label>질문*</Form.Label>
          <Controller
            name='question'
            control={control}
            defaultValue={question?.question || ''}
            render={({ field }) => (
              <Form.Control
                {...field}
                as='textarea'
                type='text'
                value={field.value || question?.question}
                placeholder='질문을 등록하세요.'
              />
            )}
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlTextarea1'
            >
              <Form.Label>중요도*</Form.Label>
              <Controller
                name='importance'
                control={control}
                defaultValue={question?.importance || ''}
                render={({ field }) => (
                  <Form.Select
                    {...field}
                    value={field.value || question?.importance}
                    aria-label='Select Importance'
                  >
                    <option>중요도 선택</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                  </Form.Select>
                )}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label>카테고리*</Form.Label>
              <Controller
                name='category'
                control={control}
                defaultValue={question?.category || ''}
                render={({ field }) => (
                  <Form.Select
                    {...field}
                    value={field.value || question?.category}
                    aria-label='Select Category'
                  >
                    <option>카테고리 선택</option>
                    {CATEGORIES.slice(1).map(({ category, label }, index) => (
                      <option key={index} value={label}>
                        {category}
                      </option>
                    ))}
                  </Form.Select>
                )}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className='mb-3'>
          <Form.Label>힌트</Form.Label>
          <Controller
            name='hints'
            control={control}
            defaultValue={question?.hints || []}
            render={({ field }) => (
              <>
                <Row>
                  <Col>
                    <Form.Control
                      type='text'
                      placeholder='힌트를 입력하세요'
                      value={newHint}
                      onChange={(e) => setNewHint(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Button
                      // disabled={hintAddBtnDisable}
                      onClick={handleAddHint}
                    >
                      추가
                    </Button>
                  </Col>
                </Row>
                <Stack direction='horizontal' gap={2}>
                  {hints?.map((hint, index) => (
                    <Badge bg='primary' key={index}>
                      {hint}
                      <CloseButton onClick={() => handleDeleteHint(index)} />
                    </Badge>
                  ))}
                </Stack>
              </>
            )}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
          <Form.Label>답변*</Form.Label>
          <Controller
            name='answer'
            control={control}
            defaultValue={question?.answers[0]?.answers || ''}
            render={({ field }) => (
              <Form.Control
                {...field}
                as='textarea'
                type='text'
                value={field.value || question?.answers[0]?.answers}
                placeholder='답변을 등록하세요.'
              />
            )}
          />
        </Form.Group>

        {/* <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
          <Form.Label>답변*</Form.Label>
          <Form.Control
            type='textarea'
            placeholder='답변을 등록하세요.'
            value={answers}
            onChange={(e) => setAnswers(e.target.value)}
          />
        </Form.Group> */}

        <Button variant='light' type='submit'>
          수정
        </Button>
        <Button
          className='mx-2'
          variant='secondary'
          onClick={() => navigate(-1)}
        >
          취소
        </Button>
        {/* </Form.Group> */}
      </Form>
    </Container>
  );
}
