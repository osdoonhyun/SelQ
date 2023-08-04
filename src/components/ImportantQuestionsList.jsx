import axios from 'axios';
import { useEffect, useState } from 'react';
import CustomBadge from './ui/CustomBadge';
import ImportantQuestion from './ui/ImportantQuestion';
import { Col, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useFontSize } from './context/FontSizingProvider';

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
      {importantQuestions.map((question) => (
        <LinkContainer
          to={`/questions/${question?.attributes?.question?.data?.id}`}
          key={question.id}
        >
          <div style={{ margin: '2rem 0 3rem' }}>
            <Row className='d-flex justify-content-between'>
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
              <Col className='text-end'>
                <ImportantQuestion
                  importanceId={question?.id}
                  importance={question?.attributes?.importantLevel}
                  questionId={question?.attributes.question.data.id}
                />
              </Col>
            </Row>
            <div
              style={{
                fontSize: calcFontSize('1.6rem', fontSizing),
                fontWeight: '500',
                lineHeight: 1.2,
                marginBottom: '0.5rem',
                letterSpacing: '0.05rem',
              }}
            >
              {question.attributes?.question.data.attributes.title}
            </div>
            <CustomBadge
              text={question.attributes?.question.data.attributes.category}
            />
          </div>
        </LinkContainer>
      ))}
    </>
  );
}
