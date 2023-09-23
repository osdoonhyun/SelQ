import { useNavigate } from 'react-router-dom';
import { CategoryFilterOption } from '../constant/constants';
import { useQuestionsByFilteringQuery } from '../services/api';
import {
  Button,
  Dropdown,
  DropdownButton,
  Modal,
  Table,
} from 'react-bootstrap';
import { useState } from 'react';
import { useDeleteQuestion } from '../services/questionHook/deleteQuestion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../components/hooks/useAuth';
import QuestionFilter from '../components/common/QuestionFilter';
import Pagination from '../components/common/Pagination';

export default function QuestionManagement() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [show, setShow] = useState(false);
  const [deletedId, setDeletedId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOptions, setFilterOptions] = useState({});

  const {
    data: questions,
    loading,
    error,
  } = useQuestionsByFilteringQuery(currentPage, filterOptions);

  const {
    mutateAsync: deleteQuestion,
    loading: loadingDelete,
    error: errorDelete,
  } = useDeleteQuestion();

  const handleOptionsClick = (item, label, options) => {
    if (label === '카테고리') {
      const updatedOptions = options
        .find((option) => option.label === label)
        .options.filter((option) => option.isChecked);
      setFilterOptions({
        ...filterOptions,
        [label]: updatedOptions,
      });
    } else {
      setFilterOptions({
        ...filterOptions,
        [label]: item,
      });
    }
  };

  const handleCategoryClick = (label, options) => {
    const updatedOptions = options
      .find((option) => option.label === label)
      .options.filter((option) => option.isChecked);
    setFilterOptions({
      ...filterOptions,
      [label]: updatedOptions,
    });
  };

  const handleDeleteModalClose = () => setShow(false);
  const handleDeleteModalShow = (questionId) => {
    setDeletedId(questionId);
    setShow(true);
  };

  const handleEditQuestion = (questionId) => {
    navigate(`/admin/edit/question/${questionId}`);
  };
  const handleDeleteQuestion = () => {
    deleteQuestion({ deletedId, token });
    handleDeleteModalClose();
  };

  const [categoryOption, setCategoryOption] = useState(CategoryFilterOption);

  const handleOptionCheck = (e, label) => {
    const { value, checked } = e.target;

    const updatedOptions = categoryOption?.map((optionGroup) => {
      if (optionGroup.label !== label) {
        return optionGroup;
      }

      const updatedOptions = optionGroup.options.map((option) => {
        if (value === '전체선택') {
          return { ...option, isChecked: checked };
        } else if (option.value === value) {
          return { ...option, isChecked: checked };
        }
        return option;
      });

      return { ...optionGroup, options: updatedOptions };
    });

    setCategoryOption(updatedOptions);
  };

  const handleDeleteOption = (label) => {
    const updatedOptions = { ...filterOptions };
    delete updatedOptions[label];
    setFilterOptions(updatedOptions);
  };

  const handleDeleteCategoryOption = (label, optionValue, optionIndex) => {
    const updatedOptions = { ...filterOptions };
    updatedOptions[label] = updatedOptions[label].filter(
      (_, index) => index !== optionIndex
    );
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [label]: updatedOptions[label],
    }));

    const updatedCategoryOptions = [...categoryOption];
    updatedCategoryOptions[0].options = updatedCategoryOptions[0].options.map(
      (option) => {
        if (option.value === optionValue) {
          return {
            ...option,
            isChecked: false,
          };
        }
        return option;
      }
    );

    setCategoryOption(updatedCategoryOptions);
  };

  return (
    <>
      <h1>질문 관리페이지</h1>
      <QuestionFilter
        filterOptions={filterOptions}
        categoryOption={categoryOption}
        handleOptionCheck={handleOptionCheck}
        handleCategoryClick={handleCategoryClick}
        handleOptionsClick={handleOptionsClick}
        handleDeleteOption={handleDeleteOption}
        handleDeleteCategoryOption={handleDeleteCategoryOption}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>질문</th>
            <th>카테고리</th>
            <th>중요도</th>
            <th>등록 날짜</th>
            <th>옵션</th>
          </tr>
        </thead>
        <tbody>
          {questions &&
            questions.questions?.map((question, index) => (
              <tr key={question.id}>
                <td>{index + 1}</td>
                <td>{question.question}</td>
                <td>{question.category}</td>
                <td>{question.importance}</td>
                <td>{question.createdAt.slice(0, 10)}</td>
                <td>
                  <DropdownButton
                    id='dropdown-basic-button'
                    variant='light'
                    title={<FontAwesomeIcon icon={faEllipsis} />}
                  >
                    <Dropdown.Item onClick={() => handleEditQuestion(question)}>
                      수정
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleDeleteModalShow(question)}
                    >
                      삭제
                    </Dropdown.Item>
                  </DropdownButton>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className='d-flex justify-content-center'>
        <Pagination
          currentPage={currentPage}
          changePage={setCurrentPage}
          paginatinoData={questions?.meta}
        />
      </div>

      <Modal show={show} onHide={handleDeleteModalClose} backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>질문 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          질문을 삭제하시면 다시 돌릴 수 없습니다 삭제하시겠습니까?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='light' onClick={handleDeleteModalClose}>
            취소
          </Button>
          <Button variant='secondary' onClick={() => handleDeleteQuestion()}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
