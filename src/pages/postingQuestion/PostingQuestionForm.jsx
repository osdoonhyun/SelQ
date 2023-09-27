import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionInput from './QuestionInput';
import AnswerInput from './AnswerInput';
import Confirmation from './Confirmation';
import { useRegisterQuestion } from '../../services/questionHook/registerQuestion';
import useAuth from '../../components/hooks/useAuth';
import ProgressBar from '../../components/common/ProgressBar';
import { Container } from 'react-bootstrap';

export default function PostingQuestionForm() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [step, setStep] = useState('질문입력');
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ['질문입력', '답변입력', '등록하기', '등록성공'];

  const {
    mutateAsync: registerQuestion,
    isLoading: loadingRegister,
    error: errorRegister,
  } = useRegisterQuestion();

  const [questionFormData, setQuestionFormData] = useState({
    question: '',
    importance: 0,
    category: '',
    hints: [],
  });
  const [answerFormData, setAnswerFormData] = useState({
    answers: '',
    question: '',
  });

  return (
    <Container
      style={{
        width: '90%',
        minWidth: '390px',
      }}
    >
      <ProgressBar steps={steps} currentStep={currentStep} />
      {step === '질문입력' && (
        <QuestionInput
          onNext={async (data) => {
            setQuestionFormData({
              question: data.question,
              importance: data.importance,
              category: data.category,
              hints: data.hints,
            });
            setCurrentStep((prev) => prev + 1);
            setStep('답변입력');
          }}
        />
      )}
      {step === '답변입력' && (
        <AnswerInput
          question={questionFormData.question}
          onNext={async (data) => {
            setAnswerFormData({
              ...answerFormData,
              answers: data.answers,
            });
            setCurrentStep((prev) => prev + 1);
            setStep('등록하기');
          }}
        />
      )}
      {step === '등록하기' && (
        <Confirmation
          question={questionFormData}
          answer={answerFormData}
          isLoading={loadingRegister}
          error={errorRegister}
          onNext={async () => {
            setCurrentStep((prev) => prev + 1);
            const { status, questionId } = await registerQuestion({
              question: questionFormData,
              answer: answerFormData,
              token,
            });

            if (status === 201) {
              setAnswerFormData({
                ...answerFormData,
                question: questionId,
              });
              setStep('등록성공');
              setCurrentStep((prev) => prev + 1);
            }
          }}
        />
      )}
      {step === '등록성공' && (
        <>
          <h1 style={{ fontSize: '2rem' }} className='mt-5'>
            등록한 게시물로 이동 중...
          </h1>
          {(() => {
            setTimeout(() => {
              navigate(`/questions/${answerFormData?.question}`);
            }, 1000);
          })()}
        </>
      )}
    </Container>
  );
}

// 1. 질문 입력, 중요도, 카테고리 입력 -> postQuestion
// 2. 질문에 대한 대답 입력 -> postAnswer
// 3. 등록 -> RegisterQuestion : 수정하기 기능도 추가될 예정
// 4. 등록성공 -> 등록된 질문으로 이동
