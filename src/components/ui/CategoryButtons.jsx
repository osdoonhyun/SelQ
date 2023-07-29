import React from 'react';
import { Badge, Button } from 'react-bootstrap';
import { CATEGORIES } from '../../constant/constants';

const CategoryButtons = ({ onClickCategory }) => {
  return (
    <div
      style={{
        display: 'flex',
        overflow: 'auto',
        width: '100%',
        gap: '5px',
      }}
      draggable='true'
    >
      {CATEGORIES.map((category, index) => (
        <Button
          key={index}
          className='d-inline-flex align-items-center'
          onClick={() => onClickCategory(category)}
          variant='outline-dark'
        >
          <span style={{ paddingRight: '5px' }}>{category}</span>
          <Badge bg='secondary'>{category.length}</Badge>
        </Button>
      ))}
    </div>
  );
};

export default CategoryButtons;
