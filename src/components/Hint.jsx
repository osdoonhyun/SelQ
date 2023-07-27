import { useState } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import CustomBadge from './ui/CustomBadge';

export default function Hint({ hints, onGetHints }) {
  const [open, setOpen] = useState(false);

  const handleHintsButton = () => {
    onGetHints();
    setOpen(!open);
  };

  return (
    <div style={{ display: 'inline-block', marginTop: '1.5rem' }}>
      <Button
        variant='outline-dark'
        onClick={handleHintsButton}
        aria-controls='example-collapse-text'
        aria-expanded={open}
        disabled={hints === null}
      >
        Hint
      </Button>
      <Collapse in={open}>
        <div
          id='example-collapse-text'
          style={{
            marginTop: '0.8rem',
          }}
        >
          {hints &&
            hints
              ?.split(', ')
              .map((hint, index) => <CustomBadge text={hint} key={index} />)}
        </div>
      </Collapse>
    </div>
  );
}
