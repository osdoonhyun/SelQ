import { useState } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

export default function Answer({ description, onGetAnswer }) {
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
      <Button
        variant='outline-dark'
        onClick={handleAnswerButton}
        aria-controls='example-collapse-text'
        aria-expanded={open}
      >
        A.
      </Button>
      <Collapse in={open}>
        <div
          id='example-collapse-text'
          style={{
            marginTop: '0.8rem',
            fontSize: '1.3rem',
            fontWeight: '400',
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
