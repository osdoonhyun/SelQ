import { useSelector } from 'react-redux';
import { bookmarkedQuestions } from '../store/Slices/bookmark';
import { LinkContainer } from 'react-router-bootstrap';
import { Col, Row } from 'react-bootstrap';
import { QuestionQ, QuestionTitle } from '../styles/Styles';
import { useFontSize } from '../context/FontSizingProvider';
import ImportanceCount from '../components/ImportanceCount';
import CustomBadge from '../components/ui/CustomBadge';
import Bookmark from '../components/ui/Bookmark';
import { GREYS } from '../styles/variables';

export default function BookmarkedQuestions() {
  const { fontSizing, calcFontSize } = useFontSize();
  const bookmarkQuestions = useSelector(bookmarkedQuestions);

  return (
    <>
      {bookmarkQuestions.length > 0 ? (
        bookmarkQuestions.map((question, index) => (
          <LinkContainer to={`/bookmarks/${question.id}`} key={question.id}>
            <div>
              <Row>
                <Col className='d-flex align-items-end'>
                  <QuestionQ size={calcFontSize('1.8rem', fontSizing)}>
                    Q.
                  </QuestionQ>
                </Col>
                <Col className='d-flex justify-content-end align-items-center'>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>
                      <ImportanceCount importance={question.importance} />
                    </div>
                    <div
                      className='mx-1'
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: '10px',
                      }}
                    >
                      <Bookmark question={question} />
                    </div>
                  </div>
                </Col>
              </Row>
              <div
                style={{
                  marginBottom:
                    index === bookmarkQuestions?.length - 1 && '50px',
                }}
              >
                <QuestionTitle
                  size={calcFontSize('1.6rem', fontSizing)}
                  mbottom='0.5rem'
                  cursor={'pointer'}
                >
                  {question.question}
                </QuestionTitle>
                <CustomBadge text={question.category} />
              </div>
            </div>
          </LinkContainer>
        ))
      ) : (
        <h2
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: GREYS.LIGHT,
            height: '60vh',
          }}
        >
          북마크를 추가해 주세요.
        </h2>
      )}
    </>
  );
}
