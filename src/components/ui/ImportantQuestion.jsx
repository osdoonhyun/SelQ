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

export default function ImportantQuestion({
  importance = 0,
  importanceId,
  questionId,
}) {
  const [added, setAdded] = useState(false);
  const [show, setShow] = useState(false);
  const [importanceLevel, setImportanceLevel] = useState(0);
  const [importantId, setImportantId] = useState(0);

  const MAX_LEVEL = IMPORTANCE_OPTIONS.length - 1;
  const MIN_LEVEL = 0;

  const handleAddClick = () => {
    increaseImportance();
    const updatedImportance =
      importanceLevel + 1 > MAX_LEVEL ? MIN_LEVEL : importanceLevel + 1;
    if (importanceLevel === 0) {
      createImportance();
    } else if (importanceLevel === 3) {
      deleteImoprtance();
    } else {
      updateImportance(updatedImportance);
    }
  };

  const increaseImportance = () => {
    setImportanceLevel((prevLevel) => {
      if (prevLevel + 1 > MAX_LEVEL) {
        return MIN_LEVEL;
      }
      return prevLevel + 1;
    });
  };

  const createImportance = async () => {
    console.log('생성 important');
    try {
      const userInput = {
        data: {
          question: questionId,
          memo: '',
          importantLevel: 1,
        },
      };
      const { status, data } = await axios.post(
        'http://localhost:1337/api/importants',
        userInput
      );
      if (status === 200) {
        console.log('생성되었습니다.', data);
        setImportantId(data.data.id);
        setAdded(true);
        setShow((prev) => !prev);
      }
    } catch (error) {
      console.log('Importance Create Handler Error', error.message);
    }
  };

  const updateImportance = async (importantLevel) => {
    console.log('업데이트 important', importantLevel);
    try {
      const userInput = {
        data: {
          question: questionId,
          memo: '',
          importantLevel: importantLevel,
        },
      };
      const { status, data } = await axios.put(
        `http://localhost:1337/api/importants/${importantId}`,
        userInput
      );

      if (status === 200) {
        console.log('importance +1 업데이트되었습니다.', data);
      }
    } catch (error) {
      console.log('Importance Update Handler Error', error.message);
    }
  };

  const deleteImoprtance = async () => {
    console.log('삭제 importance');
    try {
      const { status, data } = await axios.delete(
        `http://localhost:1337/api/importants/${importantId}`
      );

      if (status === 200) {
        console.log('삭제되었습니다.', data);
        // 북마크 해제
        setAdded(false);
        setShow((prev) => !prev);
      }
    } catch (error) {
      console.log('Importance Update Handler Error', error.message);
    }
  };

  useEffect(() => {
    setImportanceLevel(importance);
    setImportantId(importanceId);
  }, [importance, importanceId]);

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
              {added ? '북마크 추가' : '북마크 해제'}
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
