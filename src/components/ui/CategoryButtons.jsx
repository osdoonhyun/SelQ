import React from 'react';
import { Badge, Button } from 'react-bootstrap';
import { CATEGORIES } from '../../constant/constants';

const CategoryButtons = ({ questions, onClickCategory }) => {
  const categoryCounts = { All: questions.length };

  questions.forEach((question) => {
    const category = question.attributes.category;
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });

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
          <Badge bg='secondary'>{categoryCounts[category]}</Badge>
        </Button>
      ))}
    </div>
  );
};

export default CategoryButtons;
