import { useState } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useFontSize } from './context/FontSizingProvider';
import { StyledButton } from '../styles/Styles';

export default function Answer({ description, onGetAnswer }) {
  const { fontSizing, calcFontSize } = useFontSize();
  const [open, setOpen] = useState(false);

  const handleAnswerButton = () => {
    onGetAnswer();
    setOpen(!open);
  };

  return (
    <div
      style={{
        display: 'inline-block',
        marginTop: '1.2rem',
        paddingBottom: '1.2rem',
      }}
    >
      <StyledButton
        onClick={handleAnswerButton}
        aria-controls='example-collapse-text'
        aria-expanded={open}
      >
        A.
      </StyledButton>
      <Collapse in={open}>
        <div
          id='example-collapse-text'
          style={{
            marginTop: '0.8rem',
            fontSize: calcFontSize('1.3rem', fontSizing),
            lineHeight: 1.2,
            letterSpacing: '0.1rem',
          }}
        >
          <ReactMarkdown children={description} />
        </div>
      </Collapse>
    </div>
  );
}
