import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import GoBackButton from '../components/ui/GoBackButton';
import ImportantQuestion from '../components/ImportanceCount';
import { useFontSize } from '../components/context/FontSizingProvider';
import Answer from '../components/common/Answer';
import Hint from '../components/common/Hint';

export default function QuestionDetail() {
  const { fontSizing, calcFontSize } = useFontSize();
  const { questionId } = useParams();
  const [question, setQuestion] = useState({});
  const [answer, setAnswer] = useState('');
  const [hints, setHints] = useState('');

  const getQuestion = async (id) => {
    try {
      const { data, status } = await axios.get(
        `http://localhost:1337/api/questions/${id}?populate=*`
      );

      if (status === 200) {
        setQuestion(data.data.attributes);
      }
    } catch (error) {
      console.log('QuestionDetail Error', error.message);
    }
  };
  const handleGetHints = async () => {
    const hintId = question?.hint?.data?.id;
    try {
      const { data, status } = await axios.get(
        `http://localhost:1337/api/hints/${hintId}`
      );
      console.log('HINT data', data.data.attributes.hint);
      if (status === 200) {
        setHints(data.data.attributes.hint);
      }
    } catch (error) {
      console.log('Hints Handler Error', error.message);
    }
  };

  const handleGetAnswer = async () => {
    const answerId = question?.answer.data.id;
    try {
      const { data, status } = await axios.get(
        `http://localhost:1337/api/answers/${answerId}`
      );
      if (status === 200) {
        setAnswer(data.data.attributes.description);
      }
    } catch (error) {
      console.log('Answer Handler Error', error.message);
    }
  };

  useEffect(() => {
    getQuestion(questionId);
  }, []);

  return (
    <>
      <GoBackButton />
      <div
        style={{
          display: 'flex',
          backgroundColor: 'white',
          flexDirection: 'column',
        }}
      >
        <Row>
          <Col>
            <div
              style={{
                fontSize: calcFontSize('1.8rem', fontSizing),
                fontWeight: '500',
              }}
            >
              Q.
            </div>
          </Col>
          <Col className='d-flex justify-content-end align-items-center'>
            <ImportantQuestion
              importance={
                question?.importants?.data[0]?.attributes.importantLevel
              }
              importanceId={question?.importants?.data[0]?.id}
              questionId={questionId}
            />
          </Col>
        </Row>
        <div
          style={{
            fontSize: calcFontSize('1.6rem', fontSizing),
            fontWeight: '500',
            lineHeight: 1.2,
            letterSpacing: '0.05rem',
          }}
        >
          {question?.title}
        </div>
        <Fragment key={questionId}>
          <Hint hints={hints} onGetHints={handleGetHints} />
          <Answer description={answer} onGetAnswer={handleGetAnswer} />
        </Fragment>
      </div>
    </>
  );
}
