import axios from 'axios';
import { useState } from 'react';
import { Button, Toast, ToastContainer } from 'react-bootstrap';

export default function ImportantQuestion({ questionId }) {
  const [added, setAdded] = useState(false);
  const [show, setShow] = useState(false);

  const handleAddClick = () => {
    addImportant(questionId);
  };

  const addImportant = async (questionId) => {
    try {
      const userInput = {
        data: {
          question: questionId,
          memo: '',
        },
      };
      const { status } = await axios.post(
        'http://localhost:1337/api/importants',
        userInput
      );
      if (status === 200) {
        setAdded((prev) => !prev);
        setShow((prev) => !prev);
      }
    } catch (error) {
      console.log('Add Important', error.message);
    }
  };
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

      <Button variant={added ? 'dark' : 'light'} onClick={handleAddClick}>
        북마크
      </Button>
    </>
  );
}
