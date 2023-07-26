import { createContext } from 'react';
import useFontSizing from '../hooks/useFontSizing';

const defaultValue = {
  fontSizing: 'basic',
  handleFontSizing: () => {},
};

export const FontSizingContext = createContext(defaultValue);

function FontSizingProvider({ children }) {
  const fontSizingProps = useFontSizing();

  return (
    <FontSizingContext.Provider value={fontSizingProps}>
      {children}
    </FontSizingContext.Provider>
  );
}

export default FontSizingProvider;
