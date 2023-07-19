import { Badge } from 'react-bootstrap';

export default function CustomBadge({ text }) {
  return (
    <Badge
      bg='light'
      text='dark'
      style={{
        border: '1px solid black',
        borderRadius: '10px',
        padding: '5px',
        display: 'inline-block',
      }}
    >
      {text}
    </Badge>
  );
}
