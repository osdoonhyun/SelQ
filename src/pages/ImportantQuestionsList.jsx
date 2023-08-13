import axios from 'axios';
import { useEffect, useState } from 'react';
import CustomBadge from '../components/ui/CustomBadge';
import ImportantQuestion from '../components/ImportanceCount';
import { Col, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useFontSize } from '../components/context/FontSizingProvider';
import { QuestionTitle } from '../styles/Styles';

export default function ImportantQuestionsList() {
  const { fontSizing, calcFontSize } = useFontSize();
  const [importantQuestions, setImportantQuestions] = useState([]);

  const getImportantQuestions = async () => {
    try {
      const { data, status } = await axios.get(
        'http://localhost:1337/api/importants?populate=*'
      );

      if (status === 200) {
        setImportantQuestions(data.data);
      }
    } catch (error) {
      console.log('Important Questions List Error', error.message);
    }
  };

  useEffect(() => {
    getImportantQuestions();
  }, []);

  return (
    <>
      {importantQuestions.map((question, index) => (
        <LinkContainer
          to={`/importants/${question?.attributes?.question?.data?.id}`}
          key={question.id}
        >
          <div>
            <Row
              style={{
                marginTop: index === 0 ? '20px' : '50px',
              }}
            >
              <Col>
                <div
                  style={{
                    fontSize: calcFontSize('1.8rem', fontSizing),
                    fontWeight: '500',
                    cursor: 'pointer',
                  }}
                >
                  Q.
                </div>
              </Col>
              <Col className='d-flex justify-content-end align-items-center'>
                <ImportantQuestion
                  importanceId={question?.id}
                  importance={question?.attributes?.importantLevel}
                  questionId={question?.attributes.question.data.id}
                />
              </Col>
            </Row>
            <div
              style={{
                marginBottom: index === importantQuestions.length - 1 && '50px',
              }}
            >
              <QuestionTitle
                fontSizing={calcFontSize('1.6rem', fontSizing)}
                marginBottom='0.5rem'
                cursor={true}
              >
                {question.attributes?.question.data.attributes.title}
              </QuestionTitle>
              <CustomBadge
                text={question.attributes?.question.data.attributes.category}
              />
            </div>
          </div>
        </LinkContainer>
      ))}
    </>
  );
}
