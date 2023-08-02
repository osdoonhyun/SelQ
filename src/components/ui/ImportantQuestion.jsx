import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Toast, ToastContainer } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

const IMPORTANCE_OPTIONS = [
  { label: '안중요', level: 0, color: 'grey' },
  { label: '중요', level: 1, color: '#F2D035' },
  { label: '매우중요', level: 2, color: '#F2D035' },
  { label: '매우매우중요', level: 3, color: '#F2D035' },
];

export default function ImportantQuestion({ importance }) {
  const [show, setShow] = useState(false);
  const [importanceLevel, setImportanceLevel] = useState(0);

  const MAX_LEVEL = IMPORTANCE_OPTIONS.length - 1;
  const MIN_LEVEL = 0;

  const handleAddClick = () => {
    // addImportant(questionId);
    increaseImportance();
  };

  // const addImportant = async (questionId) => {
  //   try {
  //     const userInput = {
  //       data: {
  //         question: questionId,
  //         memo: '',
  //       },
  //     };
  //     const { status } = await axios.post(
  //       'http://localhost:1337/api/importants',
  //       userInput
  //     );
  //     if (status === 200) {
  //       setAdded((prev) => !prev);
  //       setShow((prev) => !prev);
  //     }
  //   } catch (error) {
  //     console.log('Add Important', error.message);
  //   }
  // };

  const increaseImportance = () => {
    setImportanceLevel((prevLevel) => {
      if (prevLevel + 1 > MAX_LEVEL) {
        return MIN_LEVEL;
      }
      return prevLevel + 1;
    });
  };

  useEffect(() => {
    setImportanceLevel(importance);
  }, [importance]);

  return (
    <>
      <ToastContainer
        className='p-3'
        position='top-center'
        style={{ zIndex: 1 }}
      >
        <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide>
          <Toast.Header>
            <strong className='me-auto'>
              {/* {added ? '북마크 추가' : '북마크 해제'} */}별
            </strong>
          </Toast.Header>
          <Toast.Body className='m-auto'>
            해당 내용은 모아보기에서 확인할 수 있습니다.
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <div onClick={handleAddClick}>
        {Array.from({ length: MAX_LEVEL }, (_, index) => (
          <FontAwesomeIcon
            key={index}
            icon={
              index >= MAX_LEVEL - importanceLevel ? faStarSolid : faStarRegular
            }
            size='xl'
            style={{
              color:
                IMPORTANCE_OPTIONS[
                  importanceLevel >= MAX_LEVEL - index ? index + 1 : MIN_LEVEL
                ].color,
            }}
          />
        ))}
      </div>
    </>
  );
}
