import { useState } from 'react';
import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';

export default function RandomQuestion() {
  const [selectedCategorty, setSelectedCategory] = useState('All');

  const handleDropdownItemClick = (eventKey) => {
    console.log('이벤트클릭', eventKey);
    setSelectedCategory(eventKey);
  };
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', margin: '30px 0' }}
    >
      <ButtonGroup>
        <Button
          variant='outline-dark'
          onClick={() => {
            console.log('다음질문');
          }}
        >
          다음 질문
        </Button>

        <DropdownButton
          variant='outline-dark'
          as={ButtonGroup}
          title={selectedCategorty}
          id='bg-nested-dropdown'
          onSelect={handleDropdownItemClick}
        >
          <Dropdown.Item eventKey='All'>All</Dropdown.Item>
          <Dropdown.Item eventKey='JavaScript'>JavaScript</Dropdown.Item>
          <Dropdown.Item eventKey='TypeScript'>TypeScript</Dropdown.Item>
          <Dropdown.Item eventKey='CS'>CS</Dropdown.Item>
          <Dropdown.Item eventKey='React'>React</Dropdown.Item>
        </DropdownButton>
      </ButtonGroup>
    </div>
  );
}
