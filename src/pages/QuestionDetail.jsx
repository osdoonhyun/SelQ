import { Col, Row } from 'react-bootstrap';
import { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import GoBackButton from '../components/ui/GoBackButton';
import ImportanceCount from '../components/ImportanceCount';
import { useFontSize } from '../context/FontSizingProvider';
import Answer from '../components/common/Answer';
import Hint from '../components/common/Hint';
import { QuestionQ, QuestionTitle } from '../styles/Styles';
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';
import { useQuestionDetailQuery } from '../hooks/queries/useGetQuestionDetailById';
import { useDispatch } from 'react-redux';
import { toggleBookmark } from '../store/Slices/bookmark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GREYS, MAIN } from '../styles/variables';
import useCheckBookmarkedQuestion from '../hooks/common/useCheckBookmarkedQuestion';
import useAuth from '../hooks/common/useAuth';
import LoginModal from '../components/common/LoginModal';

export default function QuestionDetail() {
  const { fontSizing, calcFontSize } = useFontSize();
  const { questionId } = useParams();
  const { isLoggedIn } = useAuth();
  const { data: question } = useQuestionDetailQuery(questionId);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const { bookmarked, toggleBookmarked } = useCheckBookmarkedQuestion(question);
  const dispatch = useDispatch();

  const handleClose = () => setOpenLoginModal(false);

  const handleBookmark = () => {
    if (!isLoggedIn) {
      setOpenLoginModal(true);
      return;
    }
    toggleBookmarked();
    dispatch(toggleBookmark(question));
  };

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
          <Col className='d-flex align-items-end'>
            <QuestionQ size={calcFontSize('1.8rem', fontSizing)}>Q.</QuestionQ>
          </Col>
          <Col className='d-flex justify-content-end align-items-center'>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div>
                <ImportanceCount importance={question?.importance} />
              </div>
              <div
                className='mx-1'
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: '10px',
                }}
              >
                <FontAwesomeIcon
                  style={{
                    color: bookmarked ? MAIN.MEDIUM : GREYS.MEDIUM,
                    cursor: 'pointer',
                    animation: bookmarked ? 'bounce 0.75s' : '',
                    fontSize: bookmarked ?? '2rem',
                  }}
                  onClick={handleBookmark}
                  icon={bookmarked ? faBookmarkSolid : faBookmarkRegular}
                  size='xl'
                />
              </div>
            </div>
          </Col>
        </Row>
        <QuestionTitle size={calcFontSize('1.6rem', fontSizing)}>
          {question?.question}
        </QuestionTitle>
        <Fragment key={question?.id}>
          <Hint hints={question?.hints} />
          <Answer answers={question?.answers} />
        </Fragment>
      </div>

      <LoginModal openLoginModal={openLoginModal} handleClose={handleClose} />
    </>
  );
}
