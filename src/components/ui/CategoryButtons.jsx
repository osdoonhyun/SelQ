import React from 'react';
import { CATEGORIES } from '../../constant/constants';
import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import { StyledBadge, StyledButton } from '../../styles/Styles';

const CategoryButtons = ({ questions, onClickCategory, selectedCategory }) => {
  const categoryCounts = { All: questions.length };

  questions.forEach((question) => {
    const category = question.attributes.category;
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });

  return (
    <div style={{ marginTop: '20px', padding: '0 10px 0' }}>
      <ScrollingCarousel>
        {CATEGORIES.map((category, index) => (
          <StyledButton
            style={{ margin: '5px' }}
            key={index}
            onClick={() => onClickCategory(category)}
            selected={selectedCategory === category}
          >
            <span style={{ paddingRight: '5px' }}>{category}</span>
            <StyledBadge selected={selectedCategory === category}>
              {categoryCounts[category]}
            </StyledBadge>
          </StyledButton>
        ))}
      </ScrollingCarousel>
    </div>
  );
};

export default CategoryButtons;
