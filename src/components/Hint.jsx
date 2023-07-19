import { useEffect, useState } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import HintBadge from './ui/HintBadge';

export default function Hint({ hints }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [hints]);

  return (
    <div style={{ display: 'inline-block', marginTop: '1.5rem' }}>
      <Button
        variant='outline-dark'
        onClick={() => setOpen(!open)}
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
          {hints?.split(', ').map((hint, index) => (
            <HintBadge text={hint} key={index} />
          ))}
        </div>
      </Collapse>
    </div>
  );
}
