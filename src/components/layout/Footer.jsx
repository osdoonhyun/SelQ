import { GREYS } from '../../styles/variables';

export default function Footer() {
  return (
    <div
      style={{
        height: '60px',
        bottom: 0,
        fontWeight: 500,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: GREYS.LIGHTER,
        color: GREYS.DARKEST,
      }}
    >
      @ 2023. shinseunghyun all rights reserved.
    </div>
  );
}
