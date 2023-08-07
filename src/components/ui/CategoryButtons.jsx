import React from 'react';
import { CATEGORIES } from '../../constant/constants';
import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import { MyBadge, MyButton } from '../../styles/ButtonStyles';

const CategoryButtons = ({ questions, onClickCategory, selectedCategory }) => {
  const categoryCounts = { All: questions.length };

  questions.forEach((question) => {
    const category = question.attributes.category;
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });

  return (
    <div style={{ marginTop: '20px' }}>
      <ScrollingCarousel>
        {CATEGORIES.map((category, index) => (
          <MyButton
            key={index}
            onClick={() => onClickCategory(category)}
            selected={selectedCategory === category}
          >
            <span style={{ paddingRight: '5px' }}>{category}</span>
            <MyBadge selected={selectedCategory === category}>
              {categoryCounts[category]}
            </MyBadge>
          </MyButton>
        ))}
      </ScrollingCarousel>
    </div>
  );
};

export default CategoryButtons;
