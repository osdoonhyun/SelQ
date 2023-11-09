import { ButtonGroup, DropdownButton } from 'react-bootstrap';
import { CATEGORIES } from '../../constant/categories';
import { HomeDropdownItem, HomeNextButton } from '../../styles/Styles';
import { GREYS } from '../../styles/variables';

export default function RandomQuestion({
  selectedCategory,
  onSelect,
  getNextQuestion,
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '30px 0 15px',
      }}
    >
      <ButtonGroup>
        <HomeNextButton onClick={() => getNextQuestion(selectedCategory)}>
          다음 질문
        </HomeNextButton>

        <DropdownButton
          style={{
            color: GREYS.DARKEST,
            backgroundColor: GREYS.LIGHTEST,
            border: `1px solid ${GREYS.LIGHT}`,
          }}
          variant='Light'
          as={ButtonGroup}
          title={selectedCategory}
          id='bg-nested-dropdown'
          onSelect={onSelect}
        >
          {CATEGORIES.map(({ category }, index) => (
            <HomeDropdownItem key={index} eventKey={category}>
              {category}
            </HomeDropdownItem>
          ))}
        </DropdownButton>
      </ButtonGroup>
    </div>
  );
}
