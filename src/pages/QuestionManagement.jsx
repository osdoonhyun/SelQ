import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../constant/constants';
import { useQuestionsQuery } from '../services/api';
import { Button, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { useDeleteQuestion } from '../services/questionHook/deleteQuestion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

export default function QuestionManagement() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [deletedId, setDeletedId] = useState('');

  const { data: questions } = useQuestionsQuery({ category: 'all' });
  const {
    mutateAsync: deleteQuestion,
    loading: loadingDelete,
    error: errorDelete,
  } = useDeleteQuestion();

  const handleClose = () => setShow(false);
  const handleShow = (questionId) => {
    setDeletedId(questionId);
    setShow(true);
  };

  const filteredQuestions = (label) => {
    return questions?.filter((question) => question.category === label);
  };

  const handleEdit = (questionId) => {
    navigate(`/admin/edit/question/${questionId}`);
  };
  const handleDelete = () => {
    deleteQuestion(deletedId);
  };

  return (
    <>
      <h1>질문 관리페이지</h1>
      <ul className='mb-5'>
        {CATEGORIES.slice(1)?.map(({ category, label }, index) => (
          <>
            <li key={index}>{category}</li>
            <ul>
              {filteredQuestions(label)?.map(({ id, question }, index) => (
                <li key={index}>
                  <div className='d-flex justify-content-between align-items-center my-3'>
                    {question}

                    <div className='d-none d-md-block'>
                      <Button
                        variant='light'
                        className='mx-2'
                        onClick={() => handleEdit(id)}
                      >
                        수정
                      </Button>
                      <Button
                        variant='secondary'
                        onClick={() => handleShow(id)}
                      >
                        삭제
                      </Button>
                    </div>

                    <div className='d-md-none'>
                      <DropdownButton
                        id='dropdown-basic-button'
                        variant='light'
                        title={<FontAwesomeIcon icon={faEllipsis} />}
                      >
                        <Dropdown.Item onClick={() => handleEdit(id)}>
                          수정
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleShow(id)}>
                          삭제
                        </Dropdown.Item>
                      </DropdownButton>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ))}
      </ul>

      <Modal show={show} onHide={handleClose} backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>질문 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          질문을 삭제하시면 다시 돌릴 수 없습니다 삭제하시겠습니까?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='light' onClick={handleClose}>
            취소
          </Button>
          <Button variant='secondary' onClick={() => handleDelete()}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
