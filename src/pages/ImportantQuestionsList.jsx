import axios from 'axios';
import { useEffect, useState } from 'react';
import CustomBadge from '../components/ui/CustomBadge';
import ImportanceCount from '../components/ImportanceCount';
import { Col, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useFontSize } from '../components/context/FontSizingProvider';
import { QuestionQ, QuestionTitle } from '../styles/Styles';
import { useImportantQuestionsQuery } from '../services/api';
import Pagination from '../components/common/Pagination';
import { ImportantQuestionsFilterOptions } from '../constant/constants';

export default function ImportantQuestionsList() {
  const { fontSizing, calcFontSize } = useFontSize();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilterOption, setSelectedFilterOption] = useState('');

  const { data: importantQuestions } = useImportantQuestionsQuery(
    currentPage,
    selectedFilterOption
  );

  const handleFilterOptionClick = (eventKey) => {
    setSelectedFilterOption(eventKey);
  };

  return (
    <>
      <div className='d-flex justify-content-end'>
        <DropdownButton
          variant='Light'
          id='dropdown-item-button'
          onSelect={handleFilterOptionClick}
          title='중요도'
        >
          {ImportantQuestionsFilterOptions?.map((filterOption, index) => (
            <Dropdown.Item key={index} eventKey={filterOption.label}>
              {filterOption.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>

      {importantQuestions?.data?.map((question, index) => (
        <LinkContainer to={`/importants/${question.id}`} key={question.id}>
          <div>
            <Row
              style={{
                marginTop: index === 0 ? '20px' : '50px',
              }}
            >
              <Col>
                <QuestionQ
                  size={calcFontSize('1.6rem', fontSizing)}
                  cursor={'pointer'}
                >
                  Q.
                </QuestionQ>
              </Col>
              <Col className='d-flex justify-content-end align-items-center'>
                <ImportanceCount importance={question.importance} />
              </Col>
            </Row>
            <div
              style={{
                marginBottom:
                  index === importantQuestions?.data.length - 1 && '50px',
              }}
            >
              <QuestionTitle
                size={calcFontSize('1.6rem', fontSizing)}
                mb='0.5rem'
                cursor={'pointer'}
              >
                {question.question}
              </QuestionTitle>
              <CustomBadge text={question.category} />
            </div>
          </div>
        </LinkContainer>
      ))}
      <div className='d-flex justify-content-center'>
        <Pagination
          currentPage={currentPage}
          changePage={setCurrentPage}
          paginatinoData={importantQuestions?.meta}
        />
      </div>
    </>
  );
}
