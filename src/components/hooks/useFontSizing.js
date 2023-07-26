import { useEffect, useState } from 'react';
import { convertUnitToPx } from '../utils/utils';
import { FONT_SIZE_OPTIONS } from '../../constant/constants';

export default function useFontSizing() {
  const [fontSizing, setFontSizing] = useState('basic');

  const handleFontSizing = (selectedIndex) => {
    const updatedFontSize = FONT_SIZE_OPTIONS[selectedIndex].variant;
    setFontSizing(updatedFontSize);
    localStorage.setItem('fontSizeOption', updatedFontSize);
  };

  const calcFontSize = (fontSize, fontVariant) => {
    const fontSizeValue = convertUnitToPx(fontSize);
    let calcedFontSize;
    switch (fontVariant) {
      case 'small':
        calcedFontSize = `${fontSizeValue - 3}px`;
        break;
      case 'basic':
        calcedFontSize = fontSize;
        break;
      case 'large':
        calcedFontSize = `${fontSizeValue + 3}px`;
        break;
      default:
        calcedFontSize = fontSize;
        break;
    }

    return calcedFontSize;
  };

  useEffect(() => {
    const savedFontSizeOption = localStorage.getItem('fontSizeOption');
    if (savedFontSizeOption) {
      setFontSizing(savedFontSizeOption);
    }
  }, []);

  return {
    fontSizing,
    handleFontSizing,
    calcFontSize,
  };
}
