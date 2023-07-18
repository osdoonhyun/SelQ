import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { CATEGORIES } from '../constant/constants';

export default function RandomQuestion({
  selectedCategory,
  onSelect,
  nextQuestion,
}) {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', margin: '30px 0' }}
    >
      <ButtonGroup>
        <Button
          variant='outline-dark'
          onClick={() => nextQuestion(selectedCategory)}
        >
          다음 질문
        </Button>

        <DropdownButton
          variant='outline-dark'
          as={ButtonGroup}
          title={selectedCategory}
          id='bg-nested-dropdown'
          onSelect={onSelect}
        >
          {CATEGORIES.map((category, index) => (
            <Dropdown.Item key={index} eventKey={category}>
              {category}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </ButtonGroup>
    </div>
  );
}
