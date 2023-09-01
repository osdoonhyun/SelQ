import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostQuestion from './PostQuestion';
import PostAnswer from './PostAnswer';
import RegisterQuestion from './RegisterQuestion';

export default function RegisterQuestionForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState('질문입력');
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
    <>
      {step === '질문입력' && (
        <PostQuestion
          onNext={async (data) => {
            setQuestionFormData({
              question: data.question,
              importance: data.importance,
              category: data.category,
              hints: data.hints,
            });
            setStep('답변입력');
          }}
        />
      )}
      {step === '답변입력' && (
        <PostAnswer
          question={questionFormData.question}
          onNext={async (data) => {
            setAnswerFormData({
              ...answerFormData,
              answers: data.answers,
            });
            setStep('등록하기');
          }}
        /> // 답변 등록시 answers, question: questionId 필요
      )}
      {step === '등록하기' && (
        <RegisterQuestion
          question={questionFormData}
          answer={answerFormData}
          onNext={async () => {
            try {
              const { data, status } = await axios.post(
                'http://localhost:8000/api/questions',
                questionFormData
              );

              if (status === 201) {
                try {
                  const { status } = await axios.post(
                    'http://localhost:8000/api/answers',
                    {
                      answers: answerFormData.answers,
                      question: data.id,
                    }
                  );

                  if (status === 201) {
                    setAnswerFormData({
                      ...answerFormData,
                      question: data.id,
                    });
                    setStep('등록성공');
                  }
                } catch (error) {
                  console.log('Answer Form Error', error.message);
                }
              }
            } catch (error) {
              console.log('Question Form Error', error.message);
            }
          }}
        />
      )}
      {step === '등록성공' &&
        (() => {
          navigate(`/questions/${answerFormData?.question}`);
        })()}
    </>
  );
}

// 1. 질문 입력, 중요도, 카테고리 입력 -> postQuestion
// 2. 질문에 대한 대답 입력 -> postAnswer
// 3. 등록 -> RegisterQuestion : 수정하기 기능도 추가될 예정
// 4. 등록성공 -> 등록된 질문으로 이동
