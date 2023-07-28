import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Toast, ToastContainer } from 'react-bootstrap';

const IMPORTANCE_OPTIONS = [
  { label: '안중요', level: 0, color: 'white', var: 'light' },
  { label: '중요', level: 1, color: 'yellow', var: 'success' },
  { label: '매우중요', level: 2, color: 'orange', var: 'warning' },
  { label: '매우매우중요', level: 3, color: 'red', var: 'danger' },
];

export default function ImportantQuestion({ importance, importances }) {
  const [added, setAdded] = useState(false);
  const [show, setShow] = useState(false);
  const [importanceLevel, setImportanceLevel] = useState(importance);
  console.log('중요도s,', importances); // 이렇게 하면 undefined 값이 나옴
  console.log('중요도,', importance);
  const handleAddClick = () => {
    // addImportant(questionId);
    increaseImportance();
    console.log('중요도~~', importanceLevel);
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
      if (prevLevel + 1 > 3) {
        return 0;
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

      {/* <Button variant={added ? 'dark' : 'light'} onClick={handleAddClick}> */}
      <Button
        variant={IMPORTANCE_OPTIONS[importanceLevel || 0]?.var}
        onClick={handleAddClick}
      >
        북마크: {importanceLevel}
      </Button>
    </>
  );
}
